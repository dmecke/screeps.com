import {Tree_Tree} from "../Tree/Tree";
import {Tree_Composite_Priority} from "../Tree/Composite/Priority";
import {Tree_Composite_Sequence} from "../Tree/Composite/Sequence";
import {Action_SignController} from "../Action/SignController";
import {Action_AssignControllerAsTarget} from "../Action/AssignControllerAsTarget";
import {Action_MoveToTarget} from "../Action/MoveToTarget";
import {Action_MoveToTargetRoom} from "../Action/MoveToTargetRoom";
import {Action_AssignRandomAdjacentRoomAsTargetRoom} from "../Action/AssignRandomAdjacentRoomAsTargetRoom";
import {Check_IsNotInTargetRoom} from "../Check/IsNotInTargetRoom";
import {Check_ControllerIsNotSigned} from "../Check/ControllerIsNotSigned";
import {Check_RoomHasController} from "../Check/RoomHasStructure";
import {Check_TargetRoomCanBeReached} from "../Check/TargetRoomCanBeReached";

export = new Tree_Tree(
    "Scout",
    new Tree_Composite_Priority([
        new Tree_Composite_Sequence([
            new Check_RoomHasController(),
            new Check_ControllerIsNotSigned(""),
            new Action_AssignControllerAsTarget(),
            new Tree_Composite_Priority([
                new Action_SignController(""),
                new Action_MoveToTarget(),
            ]),
        ]),
        new Tree_Composite_MemorySequence([
            new Tree_Composite_Priority([
                new Check_TargetRoomCanBeReached(),
                new Action_AssignRandomAdjacentRoomAsTargetRoom(),
            ]),
            new Tree_Composite_Priority([
                new Check_IsNotInTargetRoom(),
                new Action_AssignRandomAdjacentRoomAsTargetRoom(),
            ]),
            new Action_MoveToTargetRoom(),
        ]),
    ]),
);
