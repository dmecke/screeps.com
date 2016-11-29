import { Action_Build } from "../../Action/Build";
import { Role_Role } from "../../Role/Role";
import { StateMachine_State } from "../State";

export class StateMachine_Builder_Build extends StateMachine_State {
    private name = "Build";
    public execute(role: Role_Role) {
        if (role.creep.carry.energy === 0) {
            role.stateMachine.changeState("Pickup");
            return;
        }

        let targets = role.creep.room.findConstructionSitesByPriority(role.creep);
        if (targets.length === 0) {
            role.stateMachine.changeState("UpgradeController");
            return;
        }

        new Action_Build(role.creep).execute(targets[0]);
    }
}
