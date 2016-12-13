import {Tree_Core_Action} from "../Tree/Core/Action";
import {Tree_Core_Tick} from "../Tree/Core/Tick";
import {TREE_FAILURE, TREE_SUCCESS, TREE_RUNNING} from "../Constants";

export class Action_RepairTarget extends Tree_Core_Action {

    public tick(tick: Tree_Core_Tick): number {
        let repairer = tick.target as Creep|StructureTower;
        let target = tick.blackboard.get("target", tick.tree.id) as Structure;

        if (repairer.repair(target) !== OK) {
            return TREE_FAILURE;
        }

        if (target.hits === target.hitsMax) {
            return TREE_SUCCESS;
        }

        return TREE_RUNNING;
    }
}
