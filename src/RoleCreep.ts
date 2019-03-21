import {Tree_Tree} from "./Tree/Tree";
import {Tree_Core_Blackboard} from "./Tree/Core/Blackboard";
import {Role_Role} from "./Role/Role";
import {TREE_FAILURE} from "./Constants";
import {Util_Logger} from "./Util/Logger";

export class RoleCreep {

    public creep: Creep;

    private tree: Tree_Tree;

    private readonly blackboard: Tree_Core_Blackboard;

    constructor(creep: Creep) {
        this.creep = creep;

        const role = creep.role() as Role_Role;
        this.tree = role.tree();
        this.blackboard = new Tree_Core_Blackboard(creep);
    }

    public update(): void {
        const status = this.tree.tick(this.creep, this.blackboard);
        if (status === TREE_FAILURE) {
            Util_Logger.warn(this.creep.name + " was not able to perform an action.");
        }
        this.creep.room.trackInfo();
    }
}
