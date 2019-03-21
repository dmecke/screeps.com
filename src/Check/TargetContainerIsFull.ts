import {Tree_Core_Action} from "../Tree/Core/Action";
import {Tree_Core_Tick} from "../Tree/Core/Tick";
import {TREE_SUCCESS, TREE_FAILURE} from "../Constants";

export class Check_TargetContainerIsFull extends Tree_Core_Action {

    public tick(tick: Tree_Core_Tick): number {
        const container = tick.blackboard.get("target", tick.tree.id) as StructureContainer;

        if (_.sum(container.store) === container.storeCapacity) {
            return TREE_SUCCESS;
        }

        return TREE_FAILURE;
    }

    public getDescription(tick: Tree_Core_Tick): string {
        const container = tick.blackboard.get("target", tick.tree.id) as StructureContainer;
        const pos = container.pos;

        return "The target container at " + pos.x + "|" + pos.y + " is full.";
    }
}
