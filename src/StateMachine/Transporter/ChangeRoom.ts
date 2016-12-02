import { Role_Role } from "../../Role/Role";
import { StateMachine_State } from "../State";

export class StateMachine_Transporter_ChangeRoom extends StateMachine_State {
    private name = "ChangeRoom";

    public execute(role: Role_Role) {
        role.creep.moveToTargetRoom();

        if (role.creep.isInTargetRoom()) {
            if (role.creep.isInHomeRoom()) {
                role.stateMachine.changeState("FillStorage");
                return;
            }

            role.stateMachine.changeState("Pickup");
            return;
        }
    }
}
