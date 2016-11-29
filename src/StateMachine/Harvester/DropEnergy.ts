import { Role_Role } from "../../Role/Role";
import { StateMachine_State } from "../State";

export class StateMachine_Harvester_DropEnergy extends StateMachine_State {
    private name = "DropEnergy";
    public execute(role: Role_Role) {
        role.creep.drop(RESOURCE_ENERGY);
        role.stateMachine.changeState("Harvest");
    }
}
