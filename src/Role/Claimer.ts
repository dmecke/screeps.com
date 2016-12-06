import {Tree_Tree} from "../Tree/Tree_Tree";
import {Tree_Composite_Priority} from "../Tree/Composite/Priority";
import {Tree_Composite_Sequence} from "../Tree/Composite/Sequence";
import {Role_Role} from "./Role";
import {Check_IsInRoom} from "../Check/IsInRoom";
import {Action_MoveToRoom} from "../Action/MoveToRoom";
import {Action_ClaimController} from "../Action/ClaimController";
import {Action_ReserveController} from "../Action/ReserveController";
import {Action_MoveToTarget} from "../Action/MoveToTarget";
import {Action_AssignControllerAsTarget} from "../Action/AssignControllerAsTarget";

/**
 * @todo currently the target_room needs to be assigned manually
 */
export class Role_Claimer extends Role_Role {

    public static bodyParts(energyCapacityAvailable: number): string[] {
        return [CLAIM, MOVE];
    }

    public name(): string {
        return "Claimer";
    }

    public tree(): Tree_Tree {
        return new Tree_Tree(
            "Claimer",
            new Tree_Composite_Priority([
                new Tree_Composite_Sequence([
                    new Check_IsInRoom(this.creep, this.creep.targetRoom()),
                    new Action_AssignControllerAsTarget(),
                    new Tree_Composite_Priority([
                        new Action_ClaimController(this.creep),
                        new Action_ReserveController(this.creep),
                        new Action_MoveToTarget(),
                    ]),
                ]),
                new Action_MoveToRoom(this.creep, this.creep.targetRoom()),
            ]),
        );
    }
}
