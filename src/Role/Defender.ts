import {Role_Role} from "./Role";
import {Tree_Tree} from "../Tree/Tree_Tree";
import {Tree_Composite_Priority} from "../Tree/Composite/Priority";
import {Tree_Composite_Sequence} from "../Tree/Composite/Sequence";
import {Action_MoveTo} from "../Action/MoveTo";
import {Check_HostileCreepInRoom} from "../Check/HostileCreepInRoom";
import {Action_Attack} from "../Action/Attack";

export class Role_Defender extends Role_Role {

    public static role(): string {
        return "Defender";
    }

    public constructor(creep: Creep) {
        let room = creep.room;
        let hostileCreep = creep.pos.findClosestByPath(FIND_HOSTILE_CREEPS) as Creep;

        let tree = new Tree_Tree(
            creep,
            new Tree_Composite_Sequence([
                new Check_HostileCreepInRoom(room),
                new Tree_Composite_Priority([
                    new Action_Attack(creep, hostileCreep),
                    new Action_MoveTo(creep, hostileCreep),
                ]),
            ]),
        );

        super(creep, tree);
    }
}
