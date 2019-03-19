import {Tree_Core_Action} from "../Tree/Core/Action";
import {Tree_Core_Tick} from "../Tree/Core/Tick";
import {TREE_SUCCESS, TREE_FAILURE} from "../Constants";

export class Check_IsInRoom extends Tree_Core_Action {

    private readonly room: string;

    public constructor(room: string) {
        super();
        this.room = room;
    }

    public tick(tick: Tree_Core_Tick): number {
        const creep = tick.target as Creep;

        if (creep.isInRoom(this.room)) {
            return TREE_SUCCESS;
        }

        return TREE_FAILURE;
    }
}
