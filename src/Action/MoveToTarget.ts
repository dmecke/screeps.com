import {Tree_Core_Action} from "../Tree/Core/Action";
import {Settings} from "../Settings";
import {Tree_Core_Tick} from "../Tree/Core/Tick";

export class Action_MoveToTarget extends Tree_Core_Action {

    public tick(tick: Tree_Core_Tick): number {
        let creep = tick.target as Creep;
        let target = tick.blackboard.get("target", tick.tree.id) as { pos: RoomPosition };

        if (target === undefined) {
            return Settings.TREE_FAILURE;
        }

        if (creep.moveTo(target) !== OK) {
            return Settings.TREE_FAILURE;
        }

        /**
         * When a target tile is blocked, moveTo() still returns OK,
         * so we need to make sure the creep does not get stuck in a RUNNING state.
         */
        let nextSteps = creep.pos.findPathTo(target.pos);
        if (nextSteps.length > 0) {
            let nextPosition = new RoomPosition(nextSteps[0].x, nextSteps[0].y, creep.room.name);
            if (nextPosition.lookFor(LOOK_CREEPS).length > 0) {
                return Settings.TREE_FAILURE;
            }
        }

        if (creep.pos.isEqualTo(target)) {
            return Settings.TREE_SUCCESS;
        }

        return Settings.TREE_RUNNING;
    }
}
