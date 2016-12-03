import {Tree_Core_Composite} from "../Core/Composite";
import {Tree_Tree} from "../Tree_Tree";

export class Tree_Composite_Sequence extends Tree_Core_Composite {
    public tick() {
        for (let child of this.children) {
            let status = child.execute();

            if (status !== Tree_Tree.SUCCESS) {
                console.log("Sequence: <span style='color: #8bc5ff'>" + status + "</span>");
                return status;
            }
        }

        console.log("Sequence: <span style='color: #8bc5ff'>" + Tree_Tree.SUCCESS + "</span>");
        return Tree_Tree.SUCCESS;
    }
}
