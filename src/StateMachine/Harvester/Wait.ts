import { Role_Role } from "../../Role/Role";
import { StateMachine_State } from "../State";
import { StateMachine_Harvester_Harvest } from "./Harvest";

export class StateMachine_Harvester_Wait extends StateMachine_State {
    private name = "Wait";
    public execute(role: Role_Role) {
        role.stateMachine.changeState("Harvest");
    }
}
