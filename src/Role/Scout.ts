import {Role_Role} from "./Role";
import {Tree_Tree} from "../Tree/Tree_Tree";
import {Tree_Composite_Priority} from "../Tree/Composite/Priority";
import {Tree_Action_MoveTo} from "../Tree/Action/MoveTo";
import {Tree_Composite_Sequence} from "../Tree/Composite/Sequence";
import {Tree_Decorator_Inverter} from "../Tree/Decorator/Inverter";
import {Tree_Action_IsInRoom} from "../Tree/Action/IsInRoom";
import {Tree_Action_MoveToRoom} from "../Tree/Action/MoveToRoom";
import {Tree_Action_AssignTargetRoom} from "../Tree/Action/AssignTargetRoom";
import {Tree_Action_SignController} from "../Tree/Action/SignController";

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
            new Tree_Composite_Priority([
                new Tree_Composite_Priority([
                    new Tree_Action_SignController(creep, ""),
                    new Tree_Action_MoveTo(creep, room.controller),
                ]),
                new Tree_Composite_Sequence([
                    new Tree_Composite_Priority([
                        new Tree_Decorator_Inverter(
                            new Tree_Action_IsInRoom(creep, creep.targetRoom()),
                        ),
                        new Tree_Action_AssignTargetRoom(creep, room.findRandomAdjacentRoom()),
                    ]),
                    new Tree_Action_MoveToRoom(creep, creep.targetRoom()),
                ]),
            ]),
        );

        super(creep, tree);
    }
}
