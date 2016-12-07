import {RoleCreep} from "../RoleCreep";

export class Task_Roles {

    public execute() {
        for (let name in Game.creeps) {
            if (Game.creeps.hasOwnProperty(name)) {
                let creep = Game.creeps[name];

                new RoleCreep(creep).update();
            }
        }
    };
}
