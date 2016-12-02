import {Role_Role} from "../../Role/Role";
import {StateMachine_State} from "../State";

export class StateMachine_Scout_SignController extends StateMachine_State {
    private name = "SignController";
    public execute(role: Role_Role) {
        let room = role.creep.room;

        if (!room.hasController()) {
            role.creep.memory.target_room = role.creep.room.findRandomAdjacentRoom();
            role.stateMachine.changeState("ChangeRoom");
            return;
        }

        if (room.controller.sign === undefined || room.controller.sign.username === "dmecke") {
            role.creep.memory.target_room = role.creep.room.findRandomAdjacentRoom();
            role.stateMachine.changeState("ChangeRoom");
            return;
        }

        if (role.creep.signController(room.controller, "") === ERR_NOT_IN_RANGE) {
            role.creep.moveTo(room.controller);
        }
    }
}
