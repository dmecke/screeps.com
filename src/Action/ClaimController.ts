import {Tree_Core_Action} from "../Tree/Core/Action";
import {Tree_Core_Tick} from "../Tree/Core/Tick";
import {TREE_FAILURE, TREE_SUCCESS} from "../Constants";

export class Action_ClaimController extends Tree_Core_Action {

    public tick(tick: Tree_Core_Tick): number {
        let creep = tick.target as Creep;
        let room = creep.room;

        if (!room.hasController()) {
            return TREE_FAILURE;
        }

        if (creep.claimController(room.controller) === OK) {
            return TREE_SUCCESS;
        }

        return TREE_FAILURE;
    }
}
