import { Role_Role } from "../../Role/Role";
import { StateMachine_State } from "../State";

export class StateMachine_Transporter_Wait extends StateMachine_State {
    private name = "Wait";

    public execute(role: Role_Role) {
        console.log(role.creep.name + ": I am executing Wait.");
        role.stateMachine.changeState("Pickup");
    }
}
