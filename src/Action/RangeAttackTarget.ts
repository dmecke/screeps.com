import {Tree_Core_Action} from "../Tree/Core/Action";
import {Tree_Core_Tick} from "../Tree/Core/Tick";
import {TREE_FAILURE, TREE_SUCCESS, TREE_RUNNING} from "../Constants";

export class Action_RangeAttackTarget extends Tree_Core_Action {

    public tick(tick: Tree_Core_Tick): number {
        let creep = tick.target as Creep;
        let target = tick.blackboard.get("target", tick.tree.id) as Creep|Structure;

        if (creep.rangedAttack(target) !== OK) {
            return TREE_FAILURE;
        }

        if (target.hits === 0) {
            return TREE_SUCCESS;
        }

        return TREE_RUNNING;
    }
}
