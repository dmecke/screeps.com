import {Tree_Tree} from "../Tree/Tree_Tree";
import {Tree_Composite_Priority} from "../Tree/Composite/Priority";
import {Tree_Composite_Sequence} from "../Tree/Composite/Sequence";
import {Tree_Decorator_Inverter} from "../Tree/Decorator/Inverter";
import {Check_IsInRoom} from "../Check/IsInRoom";
import {Action_MoveToRoom} from "../Action/MoveToRoom";
import {Action_AssignTargetRoom} from "../Action/AssignTargetRoom";
import {Action_SignController} from "../Action/SignController";
import {Action_AssignControllerAsTarget} from "../Action/AssignControllerAsTarget";
import {Action_MoveToTarget} from "../Action/MoveToTarget";
import {Role_Role} from "./Role_Role";

/**
 * Moves from room to room and updates room informations in the memory.
 */
export class Role_Scout extends Role_Role {

    public static bodyParts(energyCapacityAvailable: number): string[] {
        if (energyCapacityAvailable < 550) {
            return [MOVE, MOVE, MOVE, MOVE, MOVE, MOVE];
        } else {
            return [MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE];
        }
    }

    public name(): string {
        return "Scout";
    }

    public tree(): Tree_Tree {
        return new Tree_Tree(
            "Scout",
            new Tree_Composite_Priority([
                new Tree_Composite_Sequence([
                    new Action_AssignControllerAsTarget(),
                    new Tree_Composite_Priority([
                        new Action_SignController(this.creep, ""),
                        new Action_MoveToTarget(),
                    ]),
                ]),
                new Tree_Composite_Sequence([
                    new Tree_Composite_Priority([
                        new Tree_Decorator_Inverter(
                            new Check_IsInRoom(this.creep, this.creep.targetRoom()),
                        ),
                        new Action_AssignTargetRoom(this.creep, this.creep.room.findRandomAdjacentRoom()),
                    ]),
                    new Action_MoveToRoom(this.creep, this.creep.targetRoom()),
                ]),
            ]),
        );
    }
}
