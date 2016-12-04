import {Tree_Core_Action} from "../Tree/Core/Action";
import {Settings} from "../Settings";

export class Check_IsInRoom extends Tree_Core_Action {

    private creep: Creep;

    private room: string;

    public constructor(creep: Creep, room: string) {
        super();
        this.creep = creep;
        this.room = room;
    }

    public tick(): number {
        if (this.creep.isInRoom(this.room)) {
            return Settings.TREE_SUCCESS;
        }

        return Settings.TREE_FAILURE;
    }
}
