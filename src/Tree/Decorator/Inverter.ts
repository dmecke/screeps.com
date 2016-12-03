import {Tree_Core_Decorator} from "../Core/Decorator";
import {Settings} from "../../Settings";
import {Tree_Core_Tick} from "../Core/Tick";

export class Tree_Decorator_Inverter extends Tree_Core_Decorator {
    public tick(tick: Tree_Core_Tick): number {
        let status = this.child.execute(tick);

        if (status === Settings.TREE_SUCCESS) {
            return Settings.TREE_FAILURE;
        }

        if (status === Settings.TREE_FAILURE) {
            return Settings.TREE_SUCCESS;
        }

        return status;
    }
}
