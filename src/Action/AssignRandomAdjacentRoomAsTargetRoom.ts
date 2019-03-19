import {Tree_Core_Action} from "../Tree/Core/Action";
import {Tree_Core_Tick} from "../Tree/Core/Tick";
import {TREE_FAILURE, TREE_SUCCESS} from "../Constants";

export class Action_AssignRandomAdjacentRoomAsTargetRoom extends Tree_Core_Action {

    public tick(tick: Tree_Core_Tick): number {
        const creep = tick.target as Creep;

        if (creep.room.name === "sim") {
            return TREE_FAILURE;
        }

        const targetRoom = creep.room.findRandomAdjacentRoom();
        if (creep.blacklistedRooms().indexOf(targetRoom) !== -1) {
            return TREE_FAILURE;
        }

        creep.memory.target_room = targetRoom;

        return TREE_SUCCESS;
    }
}
