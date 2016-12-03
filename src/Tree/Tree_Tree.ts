import {Tree_Core_BaseNode} from "./Core/BaseNode";

export class Tree_Tree {
    public static SUCCESS = 1;
    public static FAILURE = 2;
    public static RUNNING = 3;
    public static ERROR = 4;

    private root: Tree_Core_BaseNode;

    public constructor(root: Tree_Core_BaseNode) {
        this.root = root;
    }

    public tick() {
        console.log("===");
        return this.root.execute();
    }
}
