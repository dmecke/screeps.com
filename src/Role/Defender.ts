import {Tree_Tree} from "../Tree/Tree_Tree";
import {Tree_Composite_Priority} from "../Tree/Composite/Priority";
import {Tree_Composite_Sequence} from "../Tree/Composite/Sequence";
import {Check_HostileCreepInRoom} from "../Check/HostileCreepInRoom";
import {Action_Attack} from "../Action/Attack";
import {Action_AssignNearestHostileCreepAsTarget} from "../Action/AssignNearestHostileCreepAsTarget";
import {Action_MoveToTarget} from "../Action/MoveToTarget";
import {Role_Role} from "./Role";

export class Role_Defender extends Role_Role {

    public static bodyParts(energyCapacityAvailable: number): string[] {
        if (energyCapacityAvailable < 550) {
            return [ATTACK, ATTACK, ATTACK, TOUGH, MOVE];
        } else {
            return [ATTACK, RANGED_ATTACK, RANGED_ATTACK, MOVE, MOVE, MOVE];
        }
    }

    public name(): string {
        return "Defender";
    }

    public tree(): Tree_Tree {
        return new Tree_Tree(
            "Defender",
            new Tree_Composite_Sequence([
                new Check_HostileCreepInRoom(this.creep.room),
                new Action_AssignNearestHostileCreepAsTarget(),
                new Tree_Composite_Priority([
                    new Action_Attack(this.creep, this.creep.pos.findClosestByPath(FIND_HOSTILE_CREEPS) as Creep),
                    new Action_MoveToTarget(),
                ]),
            ]),
        );
    }
}
