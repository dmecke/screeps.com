import loadStringPrototype = require("./Screeps/String");
import loadRoomPositionPrototype = require("./Screeps/RoomPosition");
import loadCreepPrototype = require("./Screeps/Creep");
import loadStructureTowerPrototype = require("./Screeps/StructureTower");
import loadRoomPrototype = require("./Screeps/Room");
import loadSourcePrototype = require("./Screeps/Source");
import consoleCommands = require("./consoleCommands");

loadStringPrototype();
loadRoomPositionPrototype();
loadCreepPrototype();
loadStructureTowerPrototype();
loadRoomPrototype();
loadSourcePrototype();
consoleCommands();

import {Task_Cleanup} from "./Task/Cleanup";
import {Task_RoadPlanning} from "./Task/RoadPlanning";
import {Task_StructurePlanning} from "./Task/StructurePlanning";
import {Task_Roles} from "./Task/Roles";
import {Task_Spawn} from "./Task/Spawn";
import {Task_Tower} from "./Task/Tower";
import {Task_Report} from "./Task/Report";

export function loop() {
    new Task_Cleanup().execute();
    new Task_Spawn().execute();
    new Task_Roles().execute();
    new Task_Tower().execute();
    if (Game.time % 10 === 0) {
        new Task_RoadPlanning().execute();
        new Task_StructurePlanning().execute();
    }
    new Task_Report().execute();
}
