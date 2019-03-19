import {Tree_Core_Action} from "../Tree/Core/Action";
import {Tree_Core_Tick} from "../Tree/Core/Tick";
import {TREE_FAILURE, TREE_SUCCESS, TREE_RUNNING} from "../Constants";

export class Action_AttackTarget extends Tree_Core_Action {

    public tick(tick: Tree_Core_Tick): number {
        const creep = tick.target as Creep;
        const target = tick.blackboard.get("target", tick.tree.id) as Creep|Structure;

        if (creep.attack(target) !== OK) {
            return TREE_FAILURE;
        }

        if (target.hits === 0) {
            return TREE_SUCCESS;
        }

        return TREE_RUNNING;
    }
}
