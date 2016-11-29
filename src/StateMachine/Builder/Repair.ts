import { Action_Repair } from "../../Action/Repair";
import { Role_Role } from "../../Role/Role";
import { StateMachine_State } from "../State";

export class StateMachine_Builder_Repair extends StateMachine_State {
    private name = "Repair";
    public execute(role: Role_Role) {
        if (role.creep.carry.energy === 0) {
            role.stateMachine.changeState("Pickup");
        }

        let targets = role.creep.room.findDamagedStructuresByPriority(role.creep);
        if (targets.length === 0) {
            role.stateMachine.changeState("Build");
            return;
        }

        new Action_Repair(role.creep).execute(targets[0]);
    }
}
