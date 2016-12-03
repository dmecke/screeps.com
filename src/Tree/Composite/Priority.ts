import {Tree_Core_Composite} from "../Core/Composite";
import {Tree_Tree} from "../Tree_Tree";

export class Tree_Composite_Priority extends Tree_Core_Composite {
    public tick(): number {
        for (let child of this.children) {
            let status = child.execute();

            if (status !== Tree_Tree.FAILURE) {
                console.log("Priority: <span style='color: #8bc5ff'>" + status + "</span>");
                return status;
            }
        }

        console.log("Priority: <span style='color: #8bc5ff'>" + Tree_Tree.FAILURE + "</span>");
        return Tree_Tree.FAILURE;
    }
}
