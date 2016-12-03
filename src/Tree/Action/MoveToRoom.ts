import {Tree_Core_Action} from "../Core/Action";
import {Tree_Tree} from "../Tree_Tree";

export class Tree_Action_MoveToRoom extends Tree_Core_Action {

    private creep: Creep;

    private room: string;

    public constructor(creep: Creep, room: string) {
        super();
        this.creep = creep;
        this.room = room;
    }

    public tick(): number {
        if (this.creep.moveToRoom(this.room) !== OK) {
            return Tree_Tree.FAILURE;
        }

        if (this.creep.isInRoom(this.room)) {
            return Tree_Tree.SUCCESS;
        }

        return Tree_Tree.RUNNING;
    }
}
