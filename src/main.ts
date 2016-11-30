import loadCreepPrototype = require("./Screeps/Creep");
import loadRoomPrototype = require("./Screeps/Room");
import loadStructurePrototype = require("./Screeps/Structure");
import loadSourcePrototype = require("./Screeps/Source");

loadCreepPrototype();
loadRoomPrototype();
loadStructurePrototype();
loadSourcePrototype();

import { Task_Cleanup } from "./Task/Cleanup";
import { Task_RoadPlanning } from "./Task/RoadPlanning";
import { Task_StructurePlanning } from "./Task/StructurePlanning";
import { Task_Roles } from "./Task/Roles";
import { Task_Spawn } from "./Task/Spawn";

export function loop() {
    new Task_Cleanup().execute();
    new Task_Spawn().execute();
    new Task_Roles().execute();
    new Task_RoadPlanning().execute();
    new Task_StructurePlanning().execute();
}
