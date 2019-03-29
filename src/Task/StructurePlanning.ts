import {Task_Task} from "./Task";

export class Task_StructurePlanning extends Task_Task {
    public execute(): void {
        for (const name in Game.rooms) {
            if (Game.rooms.hasOwnProperty(name)) {
                this.planSpawns(Game.rooms[name]);
                this.planTowers(Game.rooms[name]);
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

        const positions = this.getSourcePositions(room);
        if (positions.length === 0) {
            return;
        }

        const averagePosition = this.getAveragePosition(positions);
        const randomizedAveragePosition = this.addRandomOffset(averagePosition, 10);

        randomizedAveragePosition.createConstructionSite(STRUCTURE_SPAWN);
    }

    private planTowers(room: Room): void {
        const towers = room.findTowers();
        if (towers.exist()) {
            return;
        }

        const positions = this.getSourcePositions(room);
        if (positions.length === 0) {
            return;
        }

        const averagePosition = this.getAveragePosition(positions);
        const randomizedAveragePosition = this.addRandomOffset(averagePosition, 10);

        randomizedAveragePosition.createConstructionSite(STRUCTURE_TOWER);
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

    private getSourcePositions(room: Room): RoomPosition[] {

        const positions = room.find(FIND_SOURCES).map((source: Source) => source.pos) as RoomPosition[];
        if (room.hasController()) {
            positions.push(room.controller.pos);
        }

        return positions;
    }

    private getAveragePosition(positions: RoomPosition[]): RoomPosition {

        if (positions.length === 0) {
            throw new Error("Cannot determine average position of an empty RoomPosition list.");
        }

        return new RoomPosition(
            _.sum(positions.map((position: RoomPosition) => position.x)) / positions.length,
            _.sum(positions.map((position: RoomPosition) => position.y)) / positions.length,
            positions[0].roomName,
        );
    }

    // @todo move to RoomPosition prototype
    private addRandomOffset(position: RoomPosition, amount: number): RoomPosition {
        return new RoomPosition(
            position.x + Math.floor(Math.random() * amount - amount / 2),
            position.y + Math.floor(Math.random() * amount - amount / 2),
            position.roomName,
        );
    }
}
