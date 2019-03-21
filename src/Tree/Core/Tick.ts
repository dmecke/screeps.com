import {Tree_Core_BaseNode} from "./BaseNode";
import {Util_Logger} from "../../Util/Logger";
import {Tree_Core_Composite} from "./Composite";
import {Tree_Core_Decorator} from "./Decorator";
import {Tree_Tree} from "../Tree";
import {Tree_Core_Blackboard} from "./Blackboard";
import {TREE_RUNNING, TREE_FAILURE, TREE_SUCCESS, TREE_ERROR} from "../../Constants";

export class Tree_Core_Tick {

    public tree: Tree_Tree;

    public blackboard: Tree_Core_Blackboard;

    public target: { debug(): boolean };

    private depth: number = 0;

    public constructor(target: { debug(): boolean }, tree: Tree_Tree, blackboard: Tree_Core_Blackboard) {
        this.target = target;
        this.tree = tree;
        this.blackboard = blackboard;
    }

    public enter(node: Tree_Core_BaseNode): void {
        this.depth++;
    }

    public beforeTick(node: Tree_Core_BaseNode): void {
        if (this.target.debug()) {
            if (node instanceof Tree_Core_Composite || node instanceof Tree_Core_Decorator) {
                Util_Logger.debug("    ".repeat(this.depth - 1) + node.getDescription(this));
            }
        }
    }

    public afterTick(node: Tree_Core_BaseNode, status: number) {

        if (this.target.debug()) {
            let color = "";
            let statusName = "";
            switch (status) {
                case TREE_SUCCESS:
                    color = "#8BFF61";
                    statusName = "SUCCESS";
                    break;

                case TREE_FAILURE:
                    color = "#FF6C0D";
                    statusName = "FAILURE";
                    break;

                case TREE_RUNNING:
                    color = "#8bc5ff";
                    statusName = "RUNNING";
                    break;

                case TREE_ERROR:
                    color = "#FF444E";
                    statusName = "-ERROR-";
                    break;

                default:
                    throw new Error();
            }

            if (node instanceof Tree_Core_Composite || node instanceof Tree_Core_Decorator) {
                Util_Logger.debug("    ".repeat(this.depth - 1) + "<span style='color: " + color + "'>" + statusName + "</span>");
            } else {
                Util_Logger.debug("    ".repeat(this.depth - 1) + "<span style='color: " + color + "'>" + statusName + "</span> " + node.getDescription(this));
            }
        }
    }

    public exit(node: Tree_Core_BaseNode): void {
        this.depth--;
    }
}
