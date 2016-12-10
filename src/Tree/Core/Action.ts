import {Tree_Core_BaseNode} from "./BaseNode";
import {Tree_Tree} from "../Tree";

export abstract class Tree_Core_Action extends Tree_Core_BaseNode {

    public assignId(tree: Tree_Tree): void {
        tree.nodeCouter++;
        this.id = tree.nodeCouter.toString() + "_" + this.constructor.name;
    }
}
