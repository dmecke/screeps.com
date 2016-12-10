import {Tree_Tree} from "../Tree/Tree";
import {Tree_Composite_Priority} from "../Tree/Composite/Priority";
import {Tree_Composite_Sequence} from "../Tree/Composite/Sequence";
import {Tree_Decorator_Inverter} from "../Tree/Decorator/Inverter";
import {Action_SignController} from "../Action/SignController";
import {Action_AssignControllerAsTarget} from "../Action/AssignControllerAsTarget";
import {Action_MoveToTarget} from "../Action/MoveToTarget";
import {Check_ControllerIsSigned} from "../Check/ControllerIsSigned";
import {Action_MoveToTargetRoom} from "../Action/MoveToTargetRoom";
import {Check_IsInTargetRoom} from "../Check/IsInTargetRoom";
import {Action_AssignRandomAdjacentRoomAsTargetRoom} from "../Action/AssignRandomAdjacentRoomAsTargetRoom";

export = new Tree_Tree(
    "Scout",
    new Tree_Composite_Priority([
        new Tree_Composite_Sequence([
            new Tree_Decorator_Inverter(
                new Check_ControllerIsSigned(""),
            ),
            new Action_AssignControllerAsTarget(),
            new Tree_Composite_Priority([
                new Action_SignController(""),
                new Action_MoveToTarget(),
            ]),
        ]),
        new Tree_Composite_Sequence([
            new Tree_Composite_Priority([
                new Tree_Decorator_Inverter(
                    new Check_IsInTargetRoom(),
                ),
                new Action_AssignRandomAdjacentRoomAsTargetRoom(),
            ]),
            new Action_MoveToTargetRoom(),
        ]),
    ]),
);
