import {Tree_Tree} from "../Tree/Tree_Tree";
import {Tree_Composite_Priority} from "../Tree/Composite/Priority";
import {Check_DroppedEnergyAvailable} from "../Check/DroppedEnergyAvailable";
import {Tree_Composite_Sequence} from "../Tree/Composite/Sequence";
import {Action_UpgradeController} from "../Action/UpgradeController";
import {Tree_Decorator_Inverter} from "../Tree/Decorator/Inverter";
import {Check_CreepCarriesNothing} from "../Check/CreepCarriesNothing";
import {Action_AssignControllerAsTarget} from "../Action/AssignControllerAsTarget";
import {Action_AssignNearestDroppedEnergyAsTarget} from "../Action/AssignNearestDroppedEnergyAsTarget";
import {Action_AssignNearestFilledStorageAsTarget} from "../Action/AssignNearestFilledStorageAsTarget";
import {Action_AssignHighestPriorityDamagedWallAsTarget} from "../Action/AssignHighestPriorityDamagedWallAsTarget";
import {Action_MoveToTarget} from "../Action/MoveToTarget";
import {Action_PickUpTarget} from "../Action/PickUpTarget";
import {Action_WithdrawFromTarget} from "../Action/WithdrawFromTarget";
import {Action_RepairTarget} from "../Action/RepairTarget";

export = new Tree_Tree(
    "Wallie",
    new Tree_Composite_Priority([
        new Tree_Composite_Sequence([
            new Tree_Decorator_Inverter(
                new Check_CreepCarriesNothing(),
            ),
            new Action_AssignHighestPriorityDamagedWallAsTarget(),
            new Tree_Composite_Priority([
                new Action_RepairTarget(),
                new Action_MoveToTarget(),
            ]),
        ]),
        new Tree_Composite_Sequence([
            new Tree_Decorator_Inverter(
                new Check_CreepCarriesNothing(),
            ),
            new Action_AssignControllerAsTarget(),
            new Tree_Composite_Priority([
                new Action_UpgradeController(),
                new Action_MoveToTarget(),
            ]),
        ]),
        new Tree_Composite_Sequence([
            new Check_DroppedEnergyAvailable(5),
            new Action_AssignNearestDroppedEnergyAsTarget(),
            new Tree_Composite_Priority([
                new Action_PickUpTarget(),
                new Action_MoveToTarget(),
            ]),
        ]),
        new Tree_Composite_Sequence([
            new Action_AssignNearestFilledStorageAsTarget(),
            new Tree_Composite_Priority([
                new Action_WithdrawFromTarget(RESOURCE_ENERGY),
                new Action_MoveToTarget(),
            ]),
        ]),
    ]),
);
