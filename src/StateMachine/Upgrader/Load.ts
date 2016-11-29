import { Action_Load } from "../../Action/Load";
import { Role_Role } from "../../Role/Role";
import { StateMachine_State } from "../State";

export class StateMachine_Upgrader_Load extends StateMachine_State {
    private name = "Load";

    public execute(role: Role_Role) {
        if (role.creep.carry.energy === role.creep.carryCapacity) {
            role.stateMachine.changeState("UpgradeController");
            return;
        }

        let targets = role.creep.room.findNearestFilledStorage(role.creep);
        if (targets.length === 0) {
            role.stateMachine.changeState("Wait");
            return;
        }

        new Action_Load(role.creep).execute(targets[0]);
    }
}
