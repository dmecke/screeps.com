import {Tree_Core_Composite} from "../Core/Composite";
import {Settings} from "../../Settings";
import {Tree_Core_Tick} from "../Core/Tick";

export class Tree_Composite_Sequence extends Tree_Core_Composite {

    public tick(tick: Tree_Core_Tick) {
        for (let child of this.children) {
            let status = child.execute(tick);

            if (status !== Settings.TREE_SUCCESS) {
                return status;
            }
        }

        return Settings.TREE_SUCCESS;
    }
}
