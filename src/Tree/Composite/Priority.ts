import {Tree_Core_Composite} from "../Core/Composite";
import {Tree_Core_Tick} from "../Core/Tick";
import {TREE_FAILURE} from "../../Constants";

export class Tree_Composite_Priority extends Tree_Core_Composite {

    public tick(tick: Tree_Core_Tick): number {
        for (const child of this.children) {
            const status = child.execute(tick);

            if (status !== TREE_FAILURE) {
                return status;
            }
        }

        return TREE_FAILURE;
    }
}
