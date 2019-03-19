import {Tree_Core_BaseNode} from "./BaseNode";
import {Tree_Tree} from "../Tree";

export abstract class Tree_Core_Composite extends Tree_Core_BaseNode {

    protected children: Tree_Core_BaseNode[];

    public constructor(children: Tree_Core_BaseNode[]) {
        super();
        this.children = children;
    }

    public assignId(tree: Tree_Tree): void {
        tree.nodeCouter++;
        this.id = tree.nodeCouter.toString() + "-" + this.constructor.name;
        for (const child of this.children) {
            child.assignId(tree);
        }
    }
}
