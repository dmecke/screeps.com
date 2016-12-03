import {Tree_Core_Decorator} from "../Core/Decorator";
import {Tree_Tree} from "../Tree_Tree";

export class Tree_Decorator_Inverter extends Tree_Core_Decorator {
    public tick(): number {
        let status = this.child.execute();

        if (status === Tree_Tree.SUCCESS) {
            console.log("Inverter: <span style='color: #8bc5ff'>" + Tree_Tree.FAILURE + "</span>");
            return Tree_Tree.FAILURE;
        }

        if (status === Tree_Tree.FAILURE) {
            console.log("Inverter: <span style='color: #8bc5ff'>" + Tree_Tree.SUCCESS + "</span>");
            return Tree_Tree.SUCCESS;
        }

        console.log("Inverter: <span style='color: #8bc5ff'>" + status + "</span>");
        return status;
    }
}
