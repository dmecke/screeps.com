import {Tree_Core_BaseNode} from "./BaseNode";

export abstract class Tree_Core_Composite extends Tree_Core_BaseNode {
    protected children: Tree_Core_BaseNode[];

    public constructor(children: Tree_Core_BaseNode[]) {
        super();
        this.children = children;
    }
}
