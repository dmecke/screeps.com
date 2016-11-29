import { Role_Role } from "../../Role/Role";
import { StateMachine_State } from "../State";

export class StateMachine_Defender_Wait extends StateMachine_State {
    private name = "Wait";
    public execute(role: Role_Role) {
        if (role.creep.room.find(FIND_HOSTILE_CREEPS).length > 0) {
            role.stateMachine.changeState("Attack");
            return;
        }
    }
}
