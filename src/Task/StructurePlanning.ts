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
        if (!room.controller.pos.hasCloseContainer()) {
            room.controller.pos.buildCloseContainer();
        }

        _.each(room.find(FIND_MY_SPAWNS), function(spawn: Spawn) {
            if (!spawn.pos.hasCloseContainer()) {
                spawn.pos.buildCloseContainer();
            }
        });

        _.each(room.find(FIND_SOURCES), function(source: Source) {
            if (!source.pos.hasCloseContainer()) {
                source.pos.buildCloseContainer();
            }
        });
    }

    private planExtensions(room: Room): void {
        // @todo
    }
}
