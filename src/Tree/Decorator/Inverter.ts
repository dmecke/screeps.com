import {Tree_Core_Decorator} from "../Core/Decorator";
import {Tree_Core_Tick} from "../Core/Tick";
import {TREE_SUCCESS, TREE_FAILURE} from "../../Constants";

export class Tree_Decorator_Inverter extends Tree_Core_Decorator {

    public tick(tick: Tree_Core_Tick): number {
        const status = this.child.execute(tick);

        if (status === TREE_SUCCESS) {
            return TREE_FAILURE;
        }

        if (status === TREE_FAILURE) {
            return TREE_SUCCESS;
        }

        return status;
    }
}
