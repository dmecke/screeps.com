import {Tree_Core_Action} from "../Core/Action";
import {Tree_Tree} from "../Tree_Tree";

export class Tree_Action_AllStoragesFilled extends Tree_Core_Action {

    private room: Room;

    public constructor(room: Room) {
        super();
        this.room = room;
    }

    public tick(): number {
        if (this.room.findFilledStorages().length === 0) {
            return Tree_Tree.SUCCESS;
        }

        return Tree_Tree.FAILURE;
    }
}
