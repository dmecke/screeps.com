import {Tree_Core_Action} from "../Core/Action";
import {Tree_Tree} from "../Tree_Tree";

export class Tree_Action_Repair extends Tree_Core_Action {

    private creep: Creep;

    private target: Structure;

    public constructor(creep: Creep, target: Structure) {
        super();
        this.creep = creep;
        this.target = target;
    }

    public tick(): number {
        if (this.creep.repair(this.target) !== OK) {
            return Tree_Tree.FAILURE;
        }

        if (this.target.hits === this.target.hitsMax) {
            return Tree_Tree.SUCCESS;
        }

        return Tree_Tree.RUNNING;
    }
}
