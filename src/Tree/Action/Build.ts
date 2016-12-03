import {Tree_Core_Action} from "../Core/Action";
import {Tree_Tree} from "../Tree_Tree";

export class Tree_Action_Build extends Tree_Core_Action {

    private creep: Creep;

    private target: ConstructionSite;

    public constructor(creep: Creep, target: ConstructionSite) {
        super();
        this.creep = creep;
        this.target = target;
    }

    public tick(): number {
        if (this.creep.build(this.target) !== OK) {
            return Tree_Tree.FAILURE;
        }

        return Tree_Tree.RUNNING;
    }
}
