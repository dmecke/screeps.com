import {Util_Logger} from "./Util/Logger";
import {Role_Role} from "./Role/Role";

let consoleCommands = () => {

    global.help = () => {
        Util_Logger.debug("help");
        Util_Logger.debug("creeps");

        return "";
    };

    global.creeps = () => {
        for (let name in Game.creeps) {
            if (Game.creeps.hasOwnProperty(name)) {
                const creep = Game.creeps[name] as Creep;
                const role = creep.role() as Role_Role;
                Util_Logger.debug(creep.name + " - " + role.name());
            }
        }

        return "";
    };

};

export = consoleCommands;
