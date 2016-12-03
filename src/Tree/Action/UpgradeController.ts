import {Tree_Core_Action} from "../Core/Action";
import {Tree_Tree} from "../Tree_Tree";

export class Tree_Action_UpgradeController extends Tree_Core_Action {

    private creep: Creep;

    public constructor(creep: Creep) {
        super();
        this.creep = creep;
    }

    public tick(): number {
        let room = this.creep.room;

        if (!room.hasController()) {
            return Tree_Tree.FAILURE;
        }

        if (this.creep.upgradeController(room.controller) === OK) {
            return Tree_Tree.SUCCESS;
        }

        return Tree_Tree.FAILURE;
    }
}
