import {RoleCreep} from "../RoleCreep";
import {Role_Role} from "../Role/Role";

export class Task_Roles {

    public execute() {
        for (let name in Game.creeps) {
            if (Game.creeps.hasOwnProperty(name)) {
                let creep = Game.creeps[name];
                let role = creep.role() as Role_Role;

                new RoleCreep(creep, role.tree()).update();
            }
        }
    };
}
