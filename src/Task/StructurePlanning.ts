import {Task_Task} from "./Task";

export class Task_StructurePlanning extends Task_Task {
    public execute(): void {
        for (let name in Game.rooms) {
            if (Game.rooms.hasOwnProperty(name)) {
                this.planContainers(Game.rooms[name]);
                this.planExtensions(Game.rooms[name]);
            }
        }
    }

    private planContainers(room: Room): void {
        if (!room.controller.hasCloseContainer()) {
            room.controller.buildCloseContainer();
        }

        _.each(room.find(FIND_MY_SPAWNS), function(spawn: Spawn) {
            if (!spawn.hasCloseContainer()) {
                spawn.buildCloseContainer();
            }
        });
    }

    private planExtensions(room: Room): void {
        // @todo
    }
}
