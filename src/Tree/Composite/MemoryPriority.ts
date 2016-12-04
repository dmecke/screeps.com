import {Tree_Core_Composite} from "../Core/Composite";
import {Settings} from "../../Settings";
import {Tree_Core_Tick} from "../Core/Tick";

export class Tree_Composite_MemoryPriority extends Tree_Core_Composite {

    public open(tick: Tree_Core_Tick): void {
        tick.blackboard.set("running_child", 0, tick.tree.id, this.id);
    }

    public tick(tick: Tree_Core_Tick): number {
        let index = tick.blackboard.get("running_child", tick.tree.id, this.id);
        for (let i = index; i < this.children.length; i++) {
            let child = this.children[i];
            let status = child.execute(tick);

            if (status === Settings.TREE_RUNNING) {
                tick.blackboard.set("running_child", i, tick.tree.id, this.id);
            }

            if (status !== Settings.TREE_FAILURE) {

                return status;
            }
        }

        return Settings.TREE_FAILURE;
    }
}
