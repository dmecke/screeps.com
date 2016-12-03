import {Tree_Core_Action} from "../Core/Action";
import {Tree_Tree} from "../Tree_Tree";

export class Tree_Action_Failer extends Tree_Core_Action {
    public tick(): number {
        console.log("Failer: <span style='color: #8bc5ff'>" + Tree_Tree.FAILURE + "</span>");
        return Tree_Tree.FAILURE;
    }
}
