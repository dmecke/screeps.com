import {Tree_Core_Action} from "../Core/Action";
import {Tree_Tree} from "../Tree_Tree";

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
            return Tree_Tree.SUCCESS;
        } else {
            return Tree_Tree.FAILURE;
        }
    }
}
