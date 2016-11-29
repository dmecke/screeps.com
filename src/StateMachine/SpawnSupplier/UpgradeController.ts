import { Action_UpgradeController } from "../../Action/UpgradeController";
import { Role_Role } from "../../Role/Role";
import { StateMachine_State } from "../State";

export class StateMachine_SpawnSupplier_UpgradeController extends StateMachine_State {
    private name = "UpgradeController";

    public execute(role: Role_Role) {
        if (role.creep.carry.energy === 0) {
            role.stateMachine.changeState("Pickup");
            return;
        }
        let targets = role.creep.room.findSpawnsInNeedOfEnergy(role.creep);
        if (targets.length > 0) {
            role.stateMachine.changeState("TransferEnergy");
            return;
        }

        new Action_UpgradeController(role.creep).execute(role.creep.room.controller);
    }
}
