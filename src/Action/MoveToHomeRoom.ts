import {Tree_Core_Action} from "../Tree/Core/Action";
import {Tree_Core_Tick} from "../Tree/Core/Tick";
import {TREE_FAILURE, TREE_SUCCESS, TREE_RUNNING} from "../Constants";

export class Action_MoveToHomeRoom extends Tree_Core_Action {

    public tick(tick: Tree_Core_Tick): number {
        const creep = tick.target as Creep;

        const status = creep.moveToRoom(creep.homeRoom());
        if (status === ERR_TIRED) {
            return TREE_RUNNING;
        } else if (status !== OK) {
            return TREE_FAILURE;
        }

        if (creep.isInRoom(creep.homeRoom())) {
            return TREE_SUCCESS;
        }

        return TREE_RUNNING;
    }

    public getDescription(tick: Tree_Core_Tick): string {
        const creep = tick.target as Creep;

        return "I try to move to my home room " + creep.homeRoom() + ".";
    }
}
