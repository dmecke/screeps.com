import {Tree_Core_Action} from "../Core/Action";
import {Tree_Tree} from "../Tree_Tree";

export class Tree_Action_Transfer extends Tree_Core_Action {

    private creep: Creep;

    private resource: string;

    private target: Creep|Spawn|Structure;

    public constructor(creep: Creep, resource: string, target: Creep|Spawn|Structure) {
        super();
        this.creep = creep;
        this.resource = resource;
        this.target = target;
    }

    public tick(): number {
        if (this.creep.transfer(this.target, this.resource) === OK) {
            return Tree_Tree.SUCCESS;
        } else {
            return Tree_Tree.FAILURE;
        }
    }
}
