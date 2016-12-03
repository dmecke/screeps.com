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
        if (room.hasController() && !room.controller.pos.hasCloseContainer()) {
            room.controller.pos.createCloseContainerConstructionSite();
        }

        _.each(room.find(FIND_MY_SPAWNS), function(spawn: Spawn) {
            if (!spawn.pos.hasCloseContainer()) {
                spawn.pos.createCloseContainerConstructionSite();
            }
        });
    }

    private planExtensions(room: Room): void {
        // @todo
    }
}
