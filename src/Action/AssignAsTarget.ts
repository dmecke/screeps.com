import {Tree_Core_Action} from "../Tree/Core/Action";
import {Tree_Core_Tick} from "../Tree/Core/Tick";
import {TREE_FAILURE, TREE_SUCCESS} from "../Constants";

export abstract class Action_AssignAsTarget extends Tree_Core_Action {

    public tick(tick: Tree_Core_Tick) {
        let creep = tick.target as Creep;
        let target = this.findTarget(creep);

        if (target === undefined || target === null) {
            return TREE_FAILURE;
        }

        tick.blackboard.set("target", target, tick.tree.id);
        return TREE_SUCCESS;
    }

    protected abstract findTarget(creep: Creep): Object;
}
