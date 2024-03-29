import {Tree_Core_Action} from "../Tree/Core/Action";
import {Tree_Core_Tick} from "../Tree/Core/Tick";
import {TREE_FAILURE, TREE_SUCCESS, TREE_RUNNING} from "../Constants";
import {Pathfinding} from '../Core/Pathfinding';

export class Action_MoveToTarget extends Tree_Core_Action {

    public tick(tick: Tree_Core_Tick): number {
        const creep = tick.target as Creep;
        const target = tick.blackboard.get("target", tick.tree.id) as { pos: RoomPosition };

        if (target === undefined) {
            return TREE_FAILURE;
        }

        const pathfinding = new Pathfinding();
        const nextSteps = pathfinding.findPath(creep.pos, target.pos);
        if (nextSteps.length === 0) {
            return TREE_SUCCESS;
        }

        const status = creep.move(nextSteps[0].direction);
        const points = nextSteps.map((step) => new RoomPosition(step.x, step.y, creep.room.name));
        new RoomVisual(creep.room.name).poly(points, { stroke: "#ffaa00", lineStyle: "dashed" });
        if (status === ERR_TIRED || status === ERR_BUSY) {
            return TREE_RUNNING;
        } else if (status !== OK) {
            return TREE_FAILURE;
        }

        /**
         * When a target tile is blocked, moveTo() still returns OK,
         * so we need to make sure the creep does not get stuck in a RUNNING state.
         */
        if (nextSteps.length > 0) {
            const nextPosition = new RoomPosition(nextSteps[0].x, nextSteps[0].y, creep.room.name);
            if (!nextPosition.canStepOn()) {
                return TREE_FAILURE;
            }
        }

        if (creep.pos.isEqualTo(target)) {
            return TREE_SUCCESS;
        }

        return TREE_RUNNING;
    }

    public getDescription(tick: Tree_Core_Tick): string {
        const target = tick.blackboard.get("target", tick.tree.id) as { pos: RoomPosition };

        return "I try to move to my target at " + target.pos.x + "|" + target.pos.y + ".";
    }
}
