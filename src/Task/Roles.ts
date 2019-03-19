import {RoleCreep} from "../RoleCreep";

export class Task_Roles {

    public execute() {
        for (const name in Game.creeps) {
            if (Game.creeps.hasOwnProperty(name)) {
                const creep = Game.creeps[name];

                new RoleCreep(creep).update();
            }
        }
    }
}
