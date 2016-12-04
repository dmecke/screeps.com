import {Role_Role} from "./Role";
import {Tree_Tree} from "../Tree/Tree_Tree";
import {Tree_Composite_Priority} from "../Tree/Composite/Priority";
import {Action_MoveTo} from "../Action/MoveTo";
import {Tree_Composite_Sequence} from "../Tree/Composite/Sequence";
import {Tree_Decorator_Inverter} from "../Tree/Decorator/Inverter";
import {Check_IsInRoom} from "../Check/IsInRoom";
import {Action_MoveToRoom} from "../Action/MoveToRoom";
import {Action_AssignTargetRoom} from "../Action/AssignTargetRoom";
import {Action_SignController} from "../Action/SignController";

/**
 * Moves from room to room and updates room informations in the memory.
 */
export class Role_Scout extends Role_Role {

    public static role(): string {
        return "Scout";
    }

    public constructor(creep: Creep) {
        let room = creep.room;

        let tree = new Tree_Tree(
            creep,
            new Tree_Composite_Priority([
                new Tree_Composite_Priority([
                    new Action_SignController(creep, ""),
                    new Action_MoveTo(creep, room.controller),
                ]),
                new Tree_Composite_Sequence([
                    new Tree_Composite_Priority([
                        new Tree_Decorator_Inverter(
                            new Check_IsInRoom(creep, creep.targetRoom()),
                        ),
                        new Action_AssignTargetRoom(creep, room.findRandomAdjacentRoom()),
                    ]),
                    new Action_MoveToRoom(creep, creep.targetRoom()),
                ]),
            ]),
        );

        super(creep, tree);
    }
}
