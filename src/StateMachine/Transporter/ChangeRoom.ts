import { Role_Role } from "../../Role/Role";
import { StateMachine_State } from "../State";

export class StateMachine_Transporter_ChangeRoom extends StateMachine_State {
    private name = "ChangeRoom";

    public execute(role: Role_Role) {
        console.log(role.creep.name + ": [ChangeRoom] executing");
        role.creep.moveToTargetRoom();

        if (role.creep.isInTargetRoom()) {
            if (role.creep.isInHomeRoom()) {
                console.log(role.creep.name + ": [ChangeRoom] Switching to FillStorage");
                role.stateMachine.changeState("FillStorage");
                return;
            }

            console.log(role.creep.name + ": [ChangeRoom] Switching to Pickup");
            role.stateMachine.changeState("Pickup");
            return;
        }
    }
}
