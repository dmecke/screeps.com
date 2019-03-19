import {Tree_Core_BaseNode} from "./Core/BaseNode";
import {Tree_Core_Tick} from "./Core/Tick";
import {Util_Logger} from "../Util/Logger";
import {Tree_Core_Blackboard} from "./Core/Blackboard";

export class Tree_Tree {

    public id: string;

    public nodeCouter: number = 0;

    private root: Tree_Core_BaseNode;

    public constructor(id: string, root: Tree_Core_BaseNode) {
        this.id = id;
        this.root = root;
        this.root.assignId(this);
    }

    public tick(target: { name: string, debug(): boolean }, blackboard: Tree_Core_Blackboard) {
        const tick = new Tree_Core_Tick(target, this, blackboard);
        if (target.debug()) {
            Util_Logger.debug(target.name + "'s behavior tree");
        }

        return this.root.execute(tick);
    }
}
