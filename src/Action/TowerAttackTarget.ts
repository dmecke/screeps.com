import {Tree_Core_Action} from "../Tree/Core/Action";
import {Tree_Core_Tick} from "../Tree/Core/Tick";
import {TREE_FAILURE, TREE_SUCCESS, TREE_RUNNING} from "../Constants";

export class Action_TowerAttackTarget extends Tree_Core_Action {

    public tick(tick: Tree_Core_Tick): number {
        let tower = tick.target as StructureTower;
        let target = tick.blackboard.get("target", tick.tree.id) as Creep;

        if (tower.attack(target) !== OK) {
            return TREE_FAILURE;
        }

        if (target.hits === 0) {
            return TREE_SUCCESS;
        }

        return TREE_RUNNING;
    }
}
