import {Tree_Core_Action} from "../Core/Action";
import {Tree_Tree} from "../Tree_Tree";

export class Tree_Action_Attack extends Tree_Core_Action {

    private creep: Creep;

    private target: Creep|Structure;

    public constructor(creep: Creep, target: Creep|Structure) {
        super();
        this.creep = creep;
        this.target = target;
    }

    public tick(): number {
        if (this.creep.attack(this.target) !== OK) {
            return Tree_Tree.FAILURE;
        }

        if (this.target.hits === 0) {
            return Tree_Tree.SUCCESS;
        }

        return Tree_Tree.RUNNING;
    }
}
