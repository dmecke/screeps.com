import {Tree_Core_Action} from "../Tree/Core/Action";
import {Tree_Core_Tick} from "../Tree/Core/Tick";
import {Settings} from "../Settings";

export abstract class Action_AssignAsTarget extends Tree_Core_Action {

    public tick(tick: Tree_Core_Tick) {
        let creep = tick.target as Creep;
        let target = this.findTarget(creep);

        if (target === undefined) {
            return Settings.TREE_FAILURE;
        }

        tick.blackboard.set("target", target, tick.tree.id);
        return Settings.TREE_SUCCESS;
    }

    protected abstract findTarget(creep: Creep): Object;
}
