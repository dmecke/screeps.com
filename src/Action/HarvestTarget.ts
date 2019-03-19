import {Tree_Core_Action} from "../Tree/Core/Action";
import {Tree_Core_Tick} from "../Tree/Core/Tick";
import {TREE_FAILURE, TREE_SUCCESS, TREE_RUNNING} from "../Constants";

export class Action_HarvestTarget extends Tree_Core_Action {

    public tick(tick: Tree_Core_Tick): number {
        const creep = tick.target as Creep;
        const source = tick.blackboard.get("target", tick.tree.id) as Source;

        if (source === undefined) {
            return TREE_FAILURE;
        }

        const status = creep.harvest(source);
        if (status !== OK) {
            return TREE_FAILURE;
        }

        if (source.energy === 0) {
            return TREE_SUCCESS;
        }

        return TREE_RUNNING;
    }
}
