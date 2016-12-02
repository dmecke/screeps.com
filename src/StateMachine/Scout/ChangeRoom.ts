import {Role_Role} from "../../Role/Role";
import {StateMachine_State} from "../State";

export class StateMachine_Scout_ChangeRoom extends StateMachine_State {
    private name = "ChangeRoom";
    public execute(role: Role_Role) {
        this.trackInformation(role);

        if (role.creep.isInTargetRoom()) {
            role.creep.memory.target_room = role.creep.room.findRandomAdjacentRoom();
        }

        if (!role.creep.memory.target_room) {
            return;
        }

        role.creep.moveToTargetRoom();
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
