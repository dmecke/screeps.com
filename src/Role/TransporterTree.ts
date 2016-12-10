import {Tree_Tree} from "../Tree/Tree";
import {Tree_Composite_Priority} from "../Tree/Composite/Priority";
import {Tree_Composite_Sequence} from "../Tree/Composite/Sequence";
import {Action_MoveToTarget} from "../Action/MoveToTarget";
import {Action_TransferToTarget} from "../Action/TransferToTarget";
import {Check_CreepIsAtCarryLimit} from "../Check/CreepIsAtCarryLimit";
import {Check_IsInHomeRoom} from "../Check/IsInHomeRoom";
import {Action_MoveToHomeRoom} from "../Action/MoveToHomeRoom";
import {Check_IsInTargetRoom} from "../Check/IsInTargetRoom";
import {Action_WithdrawFromTarget} from "../Action/WithdrawFromTarget";
import {Action_AssignNearestUnfilledControllerStorageAsTarget} from "../Action/AssignNearestUnfilledControllerStorageAsTarget";
import {Action_MoveToTargetRoom} from "../Action/MoveToTargetRoom";
import {Action_AssignNearestFilledSourceStorageAsTarget} from "../Action/AssignNearestFilledSourceStorageAsTarget";

export = new Tree_Tree(
    "Transporter",
    new Tree_Composite_Priority([
        new Tree_Composite_Sequence([
            new Check_CreepIsAtCarryLimit(),
            new Tree_Composite_Priority([
                new Tree_Composite_Sequence([
                    new Check_IsInHomeRoom(),
                    new Action_AssignNearestUnfilledControllerStorageAsTarget(),
                    new Tree_Composite_Priority([
                        new Action_TransferToTarget(RESOURCE_ENERGY),
                        new Action_MoveToTarget(),
                    ]),
                ]),
                new Action_MoveToHomeRoom(),
            ]),
        ]),
        new Tree_Composite_Sequence([
            new Tree_Composite_Priority([
                new Check_IsInTargetRoom(),
                new Action_MoveToTargetRoom(),
            ]),
            new Action_AssignNearestFilledSourceStorageAsTarget(),
            new Tree_Composite_Priority([
                new Action_WithdrawFromTarget(RESOURCE_ENERGY),
                new Action_MoveToTarget(),
            ]),
        ]),
    ]),
);
