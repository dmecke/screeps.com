import {Tree_Core_BaseNode} from "./BaseNode";
import {Tree_Tree} from "../Tree";

export class Tree_Core_Decorator extends Tree_Core_BaseNode {

    protected child: Tree_Core_BaseNode;

    public constructor(child: Tree_Core_BaseNode) {
        super();
        this.child = child;
    }

    public assignId(tree: Tree_Tree): void {
        tree.nodeCouter++;
        this.id = tree.nodeCouter.toString() + "-" + this.constructor.name;
        this.child.assignId(tree);
    }
}
