import {Tree_Core_Action} from "../Core/Action";
import {Tree_Tree} from "../Tree_Tree";

export class Tree_Action_SourceHasAttachedContainer extends Tree_Core_Action {

    private source: Source;

    public constructor(source: Source) {
        super();
        this.source = source;
    }

    public tick(): number {
        if (this.source.hasAttachedContainer()) {
            return Tree_Tree.SUCCESS;
        }

        return Tree_Tree.FAILURE;
    }
}
