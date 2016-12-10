import {Tree_Tree} from "./Tree/Tree";
import {Tree_Core_Blackboard} from "./Tree/Core/Blackboard";
import {Role_Role} from "./Role/Role";

export class RoleCreep {

    public creep: Creep;

    private tree: Tree_Tree;

    private blackboard: Tree_Core_Blackboard;

    constructor(creep: Creep) {
        this.creep = creep;

        let role = creep.role() as Role_Role;
        this.tree = role.tree();
        this.blackboard = new Tree_Core_Blackboard(creep);
    }

    public update(): void {
        this.tree.tick(this.creep, this.blackboard);
        this.creep.room.trackInfo();
    }
}
