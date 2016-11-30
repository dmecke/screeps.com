import { Settings } from "../Settings";

export class Task_RoadPlanning {
    private static resetRoom(room: Room) {
        if (room.memory.roads === undefined) {
            room.memory.roads = {};
        }
    }
    private static reduce(room: Room) {
        for (let coordinate in room.memory.roads) {
            if (room.memory.roads.hasOwnProperty(coordinate)) {
                room.memory.roads[coordinate]--;
                if (room.memory.roads[coordinate] <= 0) {
                    delete room.memory.roads[coordinate];
                } else if (room.memory.roads[coordinate] > Settings.ROAD_PLANNING_THRESHOLD) {
                    let coords = coordinate.split("|");
                    new RoomPosition(parseInt(coords[0], 10), parseInt(coords[1], 10), room.name).createConstructionSite(STRUCTURE_ROAD);
                }
            }
        }
    }
    private static increment(room: Room) {
        let creeps = room.find(FIND_MY_CREEPS) as Creep[];
        for (let creep of creeps) {
            Task_RoadPlanning.incrementAtPosition(room, creep.pos);
        }
    }
    private static incrementAtPosition(room: Room, position: RoomPosition) {
        let coordinate = position.x + "|" + position.y;
        if (position.lookFor(LOOK_TERRAIN)[0] !== "swamp" || position.lookFor(LOOK_STRUCTURES).length > 0 || position.lookFor(LOOK_CONSTRUCTION_SITES).length > 0) {
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
    public execute() {
        for (let name in Game.rooms) {
            if (Game.rooms.hasOwnProperty(name)) {
                let room = Game.rooms[name];

                Task_RoadPlanning.resetRoom(room);
                Task_RoadPlanning.increment(room);
                Task_RoadPlanning.reduce(room);
            }
        }
    }
}
