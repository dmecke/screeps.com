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
import CreepNameGenerator from "./Util/CreepNameGenerator";
import SpawnRepository from "./Repository/SpawnRepository";
import RoomRepository from "./Repository/RoomRepository";

export function loop() {
    const tasks = [];

    tasks.push(new Task_Cleanup());
    tasks.push(new Task_Spawn(new SpawnRepository(), new RoomRepository(), new CreepNameGenerator()));
    tasks.push(new Task_Roles());
    tasks.push(new Task_Tower());
    if (Game.time % 10 === 0) {
        tasks.push(new Task_RoadPlanning());
        tasks.push(new Task_StructurePlanning());
    }
    tasks.push(new Task_Report());

    tasks.forEach(task => task.execute());
}
