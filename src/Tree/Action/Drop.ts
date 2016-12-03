import {Tree_Core_Action} from "../Core/Action";
import {Tree_Tree} from "../Tree_Tree";

export class Tree_Action_Drop extends Tree_Core_Action {

    private creep: Creep;

    private resource: string;

    public constructor(creep: Creep, resource: string) {
        super();
        this.creep = creep;
        this.resource = resource;
    }

    public tick(): number {
        if (this.creep.drop(this.resource) === OK) {
            return Tree_Tree.SUCCESS;
        }

        return Tree_Tree.FAILURE;
    }
}
