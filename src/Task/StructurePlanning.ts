import {Task_Task} from "./Task";

export class Task_StructurePlanning extends Task_Task {
    public execute(): void {
        for (const name in Game.rooms) {
            if (Game.rooms.hasOwnProperty(name)) {
                this.planSpawns(Game.rooms[name]);
                this.planContainers(Game.rooms[name]);
                this.planExtensions(Game.rooms[name]);
            }
        }
    }

    private planSpawns(room: Room): void {
        const spawns = room.find(FIND_MY_SPAWNS) as StructureSpawn[];
        if (spawns.length > 0) {
            return;
        }

        const positions = room.find(FIND_SOURCES).map((source: Source) => source.pos) as RoomPosition[];
        if (room.hasController()) {
            positions.push(room.controller.pos);
        }

        if (positions.length === 0) {
            return;
        }

        const averagePosition = new RoomPosition(
            _.sum(positions.map((position: RoomPosition) => position.x)) / positions.length + Math.floor(Math.random() * 10 - 5),
            _.sum(positions.map((position: RoomPosition) => position.y)) / positions.length + Math.floor(Math.random() * 10 - 5),
            room.name,
        );

        averagePosition.createConstructionSite(STRUCTURE_SPAWN);
    }

    private planContainers(room: Room): void {
        if (room.hasController() && !room.controller.pos.hasCloseContainer()) {
            room.controller.pos.createCloseContainerConstructionSite();
        }

        _.each(room.find(FIND_MY_SPAWNS), (spawn: StructureSpawn) => {
            if (!spawn.pos.hasCloseContainer()) {
                spawn.pos.createCloseContainerConstructionSite();
            }
        });
    }

    private planExtensions(room: Room): void {
        const spawns = room.find(FIND_MY_SPAWNS) as StructureSpawn[];
        if (spawns.length === 0) {
            return;
        }

        const position = new RoomPosition(
            spawns[0].pos.x + Math.floor(Math.random() * 10 - 5),
            spawns[0].pos.y + Math.floor(Math.random() * 10 - 5),
            spawns[0].pos.roomName,
        );

        position.createConstructionSite(STRUCTURE_EXTENSION);
    }
}
