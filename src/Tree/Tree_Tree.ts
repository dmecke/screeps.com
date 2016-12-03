import {Tree_Core_BaseNode} from "./Core/BaseNode";
import {Tree_Core_Tick} from "./Core/Tick";
import {Util_Logger} from "../Util/Logger";

export class Tree_Tree {

    private target: { name: string, debug(): boolean };

    private root: Tree_Core_BaseNode;

    public constructor(target: { name: string, debug(): boolean }, root: Tree_Core_BaseNode) {
        this.target = target;
        this.root = root;
    }

    public tick() {
        let tick = new Tree_Core_Tick(this.target);
        if (this.target.debug()) {
            Util_Logger.debug(this.target.name + "'s behavior tree");
        }

        return this.root.execute(tick);
    }
}
