import {Tree_Core_Tick} from "../Tree/Core/Tick";
import {Tree_Core_Action} from "../Tree/Core/Action";
import {TREE_SUCCESS, TREE_FAILURE} from "../Constants";

export class Action_AssignAttachedContainerOfSourceAsTarget extends Tree_Core_Action {

    public tick(tick: Tree_Core_Tick) {
        let source = tick.blackboard.get("target", tick.tree.id) as Source;
        let attachedContainer = source.attachedContainer();

        if (attachedContainer === undefined) {
            return TREE_FAILURE;
        }

        tick.blackboard.set("target", attachedContainer, tick.tree.id);
        return TREE_SUCCESS;
    }
}
