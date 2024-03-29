import { Settings } from "../Settings";

export class Task_RoadPlanning {
    private static resetRoom(room: Room) {
        if (room.memory.roads === undefined) {
            room.memory.roads = {};
        }
    }

    private static reducePriority(room: Room) {
        for (const coordinate in room.memory.roads) {
            if (room.memory.roads.hasOwnProperty(coordinate)) {
                room.memory.roads[coordinate]--;
                if (room.memory.roads[coordinate] <= 0) {
                    delete room.memory.roads[coordinate];
                } else if (room.memory.roads[coordinate] > Settings.ROAD_PLANNING_THRESHOLD) {
                    const coords = coordinate.split("|");
                    new RoomPosition(parseInt(coords[0], 10), parseInt(coords[1], 10), room.name).createConstructionSite(STRUCTURE_ROAD);
                }
            }
        }
    }

    private static incrementPriorities(room: Room) {
        const creeps = room.find(FIND_MY_CREEPS) as Creep[];
        for (const creep of creeps) {
            Task_RoadPlanning.incrementPriorityAtPosition(room, creep.pos);
        }
    }

    private static incrementPriorityAtPosition(room: Room, position: RoomPosition) {
        const coordinate = position.x + "|" + position.y;
        if (this.checkRoadPlanningToBeRemovedAtPosition(position)) {
            delete room.memory.roads[coordinate];
            return;
        }

        let stepCount = room.memory.roads[coordinate];
        if (stepCount === undefined) {
            stepCount = 0;
        }
        stepCount += Settings.ROAD_PLANNING_STEP_COUNT;
        room.memory.roads[coordinate] = stepCount;
    }

    private static checkRoadPlanningToBeRemovedAtPosition(position: RoomPosition): boolean {
        if (position.lookFor(LOOK_TERRAIN)[0] !== "swamp") {
            return true;
        }

        if (position.lookFor(LOOK_STRUCTURES).length > 0) {
            return true;
        }

        if (position.lookFor(LOOK_CONSTRUCTION_SITES).length > 0) {
            return true;
        }

        return false;
    }

    public execute() {
        for (const name in Game.rooms) {
            if (Game.rooms.hasOwnProperty(name)) {
                const room = Game.rooms[name];

                Task_RoadPlanning.resetRoom(room);
                Task_RoadPlanning.incrementPriorities(room);
                Task_RoadPlanning.reducePriority(room);
            }
        }
    }
}
