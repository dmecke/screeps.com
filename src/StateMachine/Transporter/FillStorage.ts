import { Action_FillStorage } from "../../Action/FillStorage";
import { Role_Role } from "../../Role/Role";
import { StateMachine_State } from "../State";

export class StateMachine_Transporter_FillStorage extends StateMachine_State {
    private name = "FillStorage";

    public execute(role: Role_Role) {
        console.log(role.creep.name + " [FillStorage]: executing");
        if (role.creep.carry.energy === 0) {
            console.log(role.creep.name + " [FillStorage]: no energy - change to Pickup");
            role.stateMachine.changeState("Pickup");
            return;
        }

        let targets = this.findTargets(role);

        if (targets.length === 0) {
            if (role.creep.isInHomeRoom()) {
                console.log(role.creep.name + " [FillStorage]: in home room - change to TransferEnergy");
                role.stateMachine.changeState("TransferEnergy");
                return;
            } else {
                console.log(role.creep.name + " [FillStorage]: no targets and not in home room - going to home room");
                role.creep.memory.target_room = role.creep.memory.home_room;
                role.stateMachine.changeState("ChangeRoom");
                return;
            }
        }
        new Action_FillStorage(role.creep).execute(targets[0]);
    }

    private findTargets(role: Role_Role): StructureContainer[] {
        let targets = role.creep.room.find(FIND_STRUCTURES, {
            filter: (structure: StructureContainer): boolean => (structure.structureType === STRUCTURE_CONTAINER) && structure.store[RESOURCE_ENERGY] < structure.storeCapacity,
        });
        targets.sort(function(a: StructureContainer, b: StructureContainer) {
            return a.pos.getRangeTo(role.creep) - b.pos.getRangeTo(role.creep);
        });

        return targets as StructureContainer[];
    }
}
