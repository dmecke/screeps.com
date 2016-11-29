import { Role_Role } from "../../Role/Role";
import { StateMachine_State } from "../State";

export class StateMachine_Defender_Attack extends StateMachine_State {
    private name = "Attack";
    public execute(role: Role_Role) {
        if (role.creep.room.find(FIND_HOSTILE_CREEPS).length === 0) {
            role.stateMachine.changeState("Wait");
            return;
        }

        let hostileCreep = role.creep.pos.findClosestByPath(FIND_HOSTILE_CREEPS) as Creep;
        if (role.creep.attack(hostileCreep) === ERR_NOT_IN_RANGE) {
            role.creep.moveTo(hostileCreep);
        }
    }
}
