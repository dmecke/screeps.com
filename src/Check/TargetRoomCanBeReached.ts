import {Tree_Core_Action} from "../Tree/Core/Action";
import {Tree_Core_Tick} from "../Tree/Core/Tick";
import {TREE_SUCCESS, TREE_FAILURE} from "../Constants";

export class Check_TargetRoomCanBeReached extends Tree_Core_Action {

    public tick(tick: Tree_Core_Tick): number {
        const creep = tick.target as Creep;

        if (creep.targetRoom() === creep.room.name) {
            return TREE_SUCCESS;
        }

        const path = creep.pos.findPathTo(new RoomPosition(25, 25, creep.targetRoom()));

        if (path.length > 0) {
            return TREE_SUCCESS;
        }

        return TREE_FAILURE;
    }

    public getDescription(tick: Tree_Core_Tick): string {
        const creep = tick.target as Creep;

        return "My target room " + creep.targetRoom() + " can be reached.";
    }
}
