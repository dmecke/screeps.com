import {Tree_Core_Action} from "../Core/Action";
import {Tree_Tree} from "../Tree_Tree";

export class Tree_Action_Withdraw extends Tree_Core_Action {

    private creep: Creep;

    private target: Structure;

    private resource: string;

    public constructor(creep: Creep, target: Structure, resource: string) {
        super();
        this.creep = creep;
        this.target = target;
        this.resource = resource;
    }

    public tick(): number {
        if (this.creep.withdraw(this.target, this.resource) === OK) {
            return Tree_Tree.SUCCESS;
        }

        return Tree_Tree.FAILURE;
    }
}
