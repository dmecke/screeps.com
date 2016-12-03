import {Tree_Tree} from "../Tree/Tree_Tree";

export abstract class Role_Role {

    public creep: Creep;

    private tree: Tree_Tree;

    constructor(creep: Creep, tree: Tree_Tree) {
        this.creep = creep;
        this.tree = tree;
    }

    public update(): void {
        this.creep.room.trackInfo();
        console.log(this.tree.tick());
    }
}
