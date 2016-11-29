import { Role_Role } from "../../Role/Role";
import { StateMachine_State } from "../State";

export class StateMachine_Wallie_Wait extends StateMachine_State {
    private name = "Wait";

    public execute(role: Role_Role) {
        role.stateMachine.changeState("Repair");
    }
}
