import {Tree_Tree} from "../Tree/Tree";
import {Tree_Composite_Priority} from "../Tree/Composite/Priority";
import {Tree_Composite_Sequence} from "../Tree/Composite/Sequence";
import {Action_ClaimController} from "../Action/ClaimController";
import {Action_ReserveController} from "../Action/ReserveController";
import {Action_MoveToTarget} from "../Action/MoveToTarget";
import {Action_AssignControllerAsTarget} from "../Action/AssignControllerAsTarget";
import {Action_MoveToTargetRoom} from "../Action/MoveToTargetRoom";
import {Check_IsInTargetRoom} from "../Check/IsInTargetRoom";

export = new Tree_Tree(
    "Claimer",
    new Tree_Composite_Priority([
        new Tree_Composite_Sequence([
            new Check_IsInTargetRoom(),
            new Action_AssignControllerAsTarget(),
            new Tree_Composite_Priority([
                new Action_ClaimController(),
                new Action_ReserveController(),
                new Action_MoveToTarget(),
            ]),
        ]),
        new Action_MoveToTargetRoom(),
    ]),
);
