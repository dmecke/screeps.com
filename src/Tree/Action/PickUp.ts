import {Tree_Core_Action} from "../Core/Action";
import {Tree_Tree} from "../Tree_Tree";

export class Tree_Action_PickUp extends Tree_Core_Action {

    private creep: Creep;

    private target: Resource;

    public constructor(creep: Creep, target: Resource) {
        super();
        this.creep = creep;
        this.target = target;
    }

    public tick(): number {
        if (this.creep.pickup(this.target) === OK) {
            return Tree_Tree.SUCCESS;
        }

        return Tree_Tree.FAILURE;
    }
}
