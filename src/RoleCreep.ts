import {Tree_Tree} from "./Tree/Tree_Tree";
import {Tree_Core_Blackboard} from "./Tree/Core/Blackboard";

export class RoleCreep {

    public creep: Creep;

    private tree: Tree_Tree;

    private blackboard: Tree_Core_Blackboard;

    constructor(creep: Creep, tree: Tree_Tree) {
        this.creep = creep;
        this.tree = tree;
        this.blackboard = new Tree_Core_Blackboard(creep);
    }

    public update(): void {
        this.tree.tick(this.creep, this.blackboard);
        this.creep.room.trackInfo();
    }
}
