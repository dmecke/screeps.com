import {Tree_Core_Composite} from "../Core/Composite";
import {Tree_Core_Tick} from "../Core/Tick";
import {TREE_RUNNING, TREE_FAILURE} from "../../Constants";

export class Tree_Composite_MemoryPriority extends Tree_Core_Composite {

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

            if (status !== TREE_FAILURE) {

                return status;
            }
        }

        return TREE_FAILURE;
    }

    public getDescription(tick: Tree_Core_Tick): string {
        return "I try to do the best of the following things and continue them until I am finished.";
    }
}
