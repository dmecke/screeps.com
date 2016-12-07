import {Tree_Core_Action} from "../Tree/Core/Action";
import {Settings} from "../Settings";
import {Tree_Core_Tick} from "../Tree/Core/Tick";

export class Check_IsInRoom extends Tree_Core_Action {

    private room: string;

    public constructor(room: string) {
        super();
        this.room = room;
    }

    public tick(tick: Tree_Core_Tick): number {
        let creep = tick.target as Creep;

        if (creep.isInRoom(this.room)) {
            return Settings.TREE_SUCCESS;
        }

        return Settings.TREE_FAILURE;
    }
}
