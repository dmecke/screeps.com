import {Tree_Core_Action} from "../Tree/Core/Action";
import {Settings} from "../Settings";
import {Tree_Core_Tick} from "../Tree/Core/Tick";

export class Action_AssignRandomAdjacentRoomAsTargetRoom extends Tree_Core_Action {

    public tick(tick: Tree_Core_Tick): number {
        let creep = tick.target as Creep;

        creep.memory.target_room = creep.room.findRandomAdjacentRoom();

        return Settings.TREE_SUCCESS;
    }
}
