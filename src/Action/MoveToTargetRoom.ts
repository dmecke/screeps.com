import {Tree_Core_Action} from "../Tree/Core/Action";
import {Tree_Core_Tick} from "../Tree/Core/Tick";
import {TREE_FAILURE, TREE_SUCCESS, TREE_RUNNING} from "../Constants";

export class Action_MoveToTargetRoom extends Tree_Core_Action {

    public tick(tick: Tree_Core_Tick): number {
        let creep = tick.target as Creep;

        if (creep.moveToRoom(creep.targetRoom()) !== OK) {
            return TREE_FAILURE;
        }

        if (creep.isInRoom(creep.targetRoom())) {
            return TREE_SUCCESS;
        }

        return TREE_RUNNING;
    }
}
