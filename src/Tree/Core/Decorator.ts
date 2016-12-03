import {Tree_Core_BaseNode} from "./BaseNode";

export class Tree_Core_Decorator extends Tree_Core_BaseNode {
    protected child: Tree_Core_BaseNode;

    public constructor(child: Tree_Core_BaseNode) {
        super();
        this.child = child;
    }
}
