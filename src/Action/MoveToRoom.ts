import {Tree_Core_Action} from "../Tree/Core/Action";
import {Settings} from "../Settings";

export class Action_MoveToRoom extends Tree_Core_Action {

    private creep: Creep;

    private room: string;

    public constructor(creep: Creep, room: string) {
        super();
        this.creep = creep;
        this.room = room;
    }

    public tick(): number {
        if (this.creep.moveToRoom(this.room) !== OK) {
            return Settings.TREE_FAILURE;
        }

        if (this.creep.isInRoom(this.room)) {
            return Settings.TREE_SUCCESS;
        }

        return Settings.TREE_RUNNING;
    }
}
