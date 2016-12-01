import { Role_Role } from "../../Role/Role";
import { StateMachine_State } from "../State";

export class StateMachine_Scout_ChangeRoom extends StateMachine_State {
    private name = "ChangeRoom";
    public execute(role: Role_Role) {
        this.trackInformation(role);

        if (this.isInTargetRoom(role)) {
            this.assignNewTargetRoom(role);
        }

        if (!role.creep.memory.target_room) {
            return;
        }

        role.creep.moveTo(new RoomPosition(25, 25, role.creep.memory.target_room));
    }

    private assignNewTargetRoom(role: Role_Role): void {
        let rooms: string[] = [];
        let exits = Game.map.describeExits(role.creep.room.name);
        for (let direction in exits) {
            if (exits.hasOwnProperty(direction) && Game.map.isRoomAvailable(exits[direction])) {
                rooms.push(exits[direction]);
            }
        }
        let index = Math.floor(Math.random() * rooms.length);
        role.creep.memory.target_room = rooms[index];
    }

    private isInTargetRoom(role: Role_Role): boolean {
        return role.creep.memory.target_room === role.creep.room.name || role.creep.memory.target_room === undefined;
    }

    private trackInformation(role: Role_Role): void {
        let room = role.creep.room;
        room.memory = {
            energy_available: room.energyAvailable,
            energy_capacity_available: room.energyCapacityAvailable,
            has_controller: room.controller !== undefined,
            has_storage: room.storage !== undefined,
            has_terminal: room.terminal !== undefined,
            last_visited: new Date(),
            number_of_hostile_creeps: room.find(FIND_HOSTILE_CREEPS).length,
            number_of_sources: room.find(FIND_SOURCES).length,
            rcl: room.controller !== undefined ? room.controller.level : null,
        };
    }
}
