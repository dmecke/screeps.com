import {Tree_Core_Action} from "../Core/Action";
import {Tree_Tree} from "../Tree_Tree";

export class Tree_Action_AssignTargetRoom extends Tree_Core_Action {

    private creep: Creep;

    private room: string;

    public constructor(creep: Creep, room: string) {
        super();
        this.creep = creep;
        this.room = room;
    }

    public tick(): number {
        this.creep.memory.target_room = this.room;

        return Tree_Tree.SUCCESS;
    }
}
