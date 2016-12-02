import { Action_Pickup } from "../../Action/Pickup";
import { Role_Role } from "../../Role/Role";
import { StateMachine_State } from "../State";

export class StateMachine_Transporter_Pickup extends StateMachine_State {
    private name = "Pickup";

    public execute(role: Role_Role) {
        console.log(role.creep.name + ": I am executing Pickup.");
        if (role.creep.carry.energy === role.creep.carryCapacity) {
            role.stateMachine.changeState("FillStorage");
            return;
        }

        let targets = role.creep.room.findNearestDroppedEnergy(role.creep);
        console.log(targets.length + " dropped energy targets in this room.");

        if (targets.length === 0) {
            role.creep.memory.target_room = role.creep.room.findRandomAdjacentRoom();
            role.stateMachine.changeState("ChangeRoom");
            return;
        }

        new Action_Pickup(role.creep).execute(targets[0]);
    }
}
