import {Tree_Core_Composite} from "../Core/Composite";
import {Settings} from "../../Settings";
import {Tree_Core_Tick} from "../Core/Tick";

export class Tree_Composite_Priority extends Tree_Core_Composite {

    public tick(tick: Tree_Core_Tick): number {
        for (let child of this.children) {
            let status = child.execute(tick);

            if (status !== Settings.TREE_FAILURE) {
                return status;
            }
        }

        return Settings.TREE_FAILURE;
    }
}
