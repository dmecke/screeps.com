import {Tree_Core_Action} from "../Tree/Core/Action";
import {Tree_Core_Tick} from "../Tree/Core/Tick";
import {TREE_SUCCESS, TREE_FAILURE} from "../Constants";

export class Check_TargetSourceHasAttachedContainer extends Tree_Core_Action {

    public tick(tick: Tree_Core_Tick): number {
        let source = tick.blackboard.get("target", tick.tree.id) as Source;

        if (source.hasAttachedContainer()) {
            return TREE_SUCCESS;
        }

        return TREE_FAILURE;
    }
}
