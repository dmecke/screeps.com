import {Tree_Core_Action} from "../Tree/Core/Action";
import {TREE_SUCCESS, TREE_FAILURE} from "../Constants";
import {Tree_Core_Tick} from "../Tree/Core/Tick";

export class Check_RoomHasController extends Tree_Core_Action {

    public tick(tick: Tree_Core_Tick): number {
        const creep = tick.target as Creep;

        if (creep.room.hasController()) {
            return TREE_SUCCESS;
        }

        return TREE_FAILURE;
    }

    public getDescription(tick: Tree_Core_Tick): string {
        const creep = tick.target as Creep;

        return "The room " + creep.room.name + " has a controller.";
    }
}
