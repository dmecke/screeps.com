import {Tree_Core_Action} from "../Core/Action";
import {Settings} from "../../Settings";

export class Tree_Action_IsInRoom extends Tree_Core_Action {

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
        } else {
            return Settings.TREE_FAILURE;
        }
    }
}
