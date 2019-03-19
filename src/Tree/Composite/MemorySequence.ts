import {Tree_Core_Composite} from "../Core/Composite";
import {Tree_Core_Tick} from "../Core/Tick";
import {TREE_RUNNING, TREE_SUCCESS} from "../../Constants";

export class Tree_Composite_MemorySequence extends Tree_Core_Composite {

    public open(tick: Tree_Core_Tick): void {
        tick.blackboard.set("running_child", 0, tick.tree.id, this.id);
    }

    public tick(tick: Tree_Core_Tick): number {
        const index = tick.blackboard.get("running_child", tick.tree.id, this.id);
        for (let i = index; i < this.children.length; i++) {
            const child = this.children[i];
            const status = child.execute(tick);

            if (status === TREE_RUNNING) {
                tick.blackboard.set("running_child", i, tick.tree.id, this.id);
            }

            if (status !== TREE_SUCCESS) {

                return status;
            }
        }

        return TREE_SUCCESS;
    }
}
