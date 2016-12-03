import {Tree_Core_Action} from "../Core/Action";
import {Tree_Tree} from "../Tree_Tree";

export class Tree_Action_SignController extends Tree_Core_Action {

    private creep: Creep;

    private message: string;

    public constructor(creep: Creep, message: string) {
        super();
        this.creep = creep;
        this.message = message;
    }

    public tick(): number {
        let room = this.creep.room;

        if (!room.hasController()) {
            return Tree_Tree.FAILURE;
        }

        if (this.creep.signController(room.controller, this.message) === OK) {
            return Tree_Tree.SUCCESS;
        }

        return Tree_Tree.FAILURE;
    }
}
