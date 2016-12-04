import {Tree_Core_Action} from "../Tree/Core/Action";
import {Settings} from "../Settings";
import {Tree_Core_Tick} from "../Tree/Core/Tick";

export class Check_TargetSourceHasAttachedContainer extends Tree_Core_Action {

    public tick(tick: Tree_Core_Tick): number {
        let source = tick.blackboard.get("target", tick.tree.id) as Source;

        if (source.hasAttachedContainer()) {
            return Settings.TREE_SUCCESS;
        }

        return Settings.TREE_FAILURE;
    }
}
