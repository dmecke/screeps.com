import {Tree_Tree} from "../Tree/Tree";
import {Tree_Composite_Priority} from "../Tree/Composite/Priority";
import {Tree_Composite_Sequence} from "../Tree/Composite/Sequence";
import {Check_DroppedEnergyAvailable} from "../Check/DroppedEnergyAvailable";
import {Action_UpgradeController} from "../Action/UpgradeController";
import {Action_AssignControllerAsTarget} from "../Action/AssignControllerAsTarget";
import {Action_AssignNearestDroppedEnergyAsTarget} from "../Action/AssignNearestDroppedEnergyAsTarget";
import {Action_AssignNearestFilledStorageAsTarget} from "../Action/AssignNearestFilledStorageAsTarget";
import {Action_MoveToTarget} from "../Action/MoveToTarget";
import {Action_PickUpTarget} from "../Action/PickUpTarget";
import {Action_WithdrawFromTarget} from "../Action/WithdrawFromTarget";
import {Check_CreepCarriesSomething} from "../Check/CreepCarriesSomething";

export = new Tree_Tree(
    "Upgrader",
    new Tree_Composite_Priority([
        new Tree_Composite_Sequence([
            new Check_CreepCarriesSomething(),
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
