import {Role_Role} from "../../Role/Role";
import {StateMachine_State} from "../State";

export class StateMachine_Scout_ChangeRoom extends StateMachine_State {
    private name = "ChangeRoom";
    public execute(role: Role_Role) {
        if (role.creep.isInTargetRoom()) {
            role.stateMachine.changeState("SignController");
            return;
        }

        if (!role.creep.memory.target_room) {
            return;
        }

        role.creep.moveToTargetRoom();
    }
}
