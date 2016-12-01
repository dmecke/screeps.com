import { Role_Builder } from "../Role/Builder";
import { Role_Harvester } from "../Role/Harvester";
import { Role_Role } from "../Role/Role";
import { Role_SpawnSupplier } from "../Role/SpawnSupplier";
import { Role_Transporter } from "../Role/Transporter";
import { Role_Upgrader } from "../Role/Upgrader";
import { Role_Wallie } from "../Role/Wallie";
import { Util_Logger } from "../Util/Logger";
import {Role_Defender} from "../Role/Defender";
import {Role_Scout} from "../Role/Scout";

export class Task_Roles {
    public execute() {
        for (let name in Game.creeps) {
            if (Game.creeps.hasOwnProperty(name)) {
                let creep = Game.creeps[name];
                let role: Role_Role;
                switch (creep.role()) {
                    case Role_Harvester.role():
                        role = new Role_Harvester(creep);
                        break;

                    case Role_Builder.role():
                        role = new Role_Builder(creep);
                        break;

                    case Role_Upgrader.role():
                        role = new Role_Upgrader(creep);
                        break;

                    case Role_Transporter.role():
                        role = new Role_Transporter(creep);
                        break;

                    case Role_SpawnSupplier.role():
                        role = new Role_SpawnSupplier(creep);
                        break;

                    case Role_Wallie.role():
                        role = new Role_Wallie(creep);
                        break;

                    case Role_Defender.role():
                        role = new Role_Defender(creep);
                        break;

                    case Role_Scout.role():
                        role = new Role_Scout(creep);
                        break;

                    default:
                        Util_Logger.error(creep.name + " has an invalid role: '" + creep.role() + "'");
                        throw new Error();
                }
                role.update();
            }
        }
    };
}
