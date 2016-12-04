import {Tree_Core_Tick} from "../Tree/Core/Tick";
import {Settings} from "../Settings";
import {Tree_Core_Action} from "../Tree/Core/Action";

export class Action_AssignAttachedContainerOfSourceAsTarget extends Tree_Core_Action {

    public tick(tick: Tree_Core_Tick) {
        let source = tick.blackboard.get("target", tick.tree.id) as Source;
        let attachedContainer = source.attachedContainer();

        if (attachedContainer === undefined) {
            return Settings.TREE_FAILURE;
        }

        tick.blackboard.set("target", attachedContainer, tick.tree.id);
        return Settings.TREE_SUCCESS;
    }
}
