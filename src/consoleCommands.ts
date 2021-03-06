import {Util_Logger} from "./Util/Logger";
import {Role_Role} from "./Role/Role";
import CreepRepository from "./Repository/CreepRepository";

const consoleCommands = () => {

    global.help = () => {
        Util_Logger.debug("help");
        Util_Logger.debug("creeps");

        return "";
    };

    global.creeps = () => {
        for (const name in Game.creeps) {
            if (Game.creeps.hasOwnProperty(name)) {
                const creep = Game.creeps[name] as Creep;
                const role = creep.role() as Role_Role;
                Util_Logger.debug(creep.name + " - " + role.name());
            }
        }

        return "";
    };

    global.debug = (creepName: string) => {
        CreepRepository.findByName(creepName).toggleDebug();

        return "";
    };

};

export = consoleCommands;
