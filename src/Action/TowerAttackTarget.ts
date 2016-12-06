import {Tree_Core_Action} from "../Tree/Core/Action";
import {Settings} from "../Settings";
import {Tree_Core_Tick} from "../Tree/Core/Tick";

export class Action_TowerAttackTarget extends Tree_Core_Action {

    public tick(tick: Tree_Core_Tick): number {
        let tower = tick.target as StructureTower;
        let target = tick.blackboard.get("target", tick.tree.id) as Creep;

        if (tower.attack(target) !== OK) {
            return Settings.TREE_FAILURE;
        }

        if (target.hits === 0) {
            return Settings.TREE_SUCCESS;
        }

        return Settings.TREE_RUNNING;
    }
}
