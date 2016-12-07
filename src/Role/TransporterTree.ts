import {Tree_Tree} from "../Tree/Tree_Tree";
import {Tree_Composite_Priority} from "../Tree/Composite/Priority";
import {Check_DroppedEnergyAvailable} from "../Check/DroppedEnergyAvailable";
import {Tree_Composite_Sequence} from "../Tree/Composite/Sequence";
import {Check_AllSpawnsFilled} from "../Check/AllSpawnsFilled";
import {Tree_Decorator_Inverter} from "../Tree/Decorator/Inverter";
import {Check_AllStoragesFilled} from "../Check/AllStoragesFilled";
import {Action_AssignNearestUnfilledStorageAsTarget} from "../Action/AssignNearestUnfilledStorageAsTarget";
import {Action_AssignNearestSpawnInNeedOfEnergyAsTarget} from "../Action/AssignNearestSpawnInNeedOfEnergyAsTarget";
import {Action_AssignNearestDroppedEnergyAsTarget} from "../Action/AssignNearestDroppedEnergyAsTarget";
import {Action_MoveToTarget} from "../Action/MoveToTarget";
import {Action_TransferToTarget} from "../Action/TransferToTarget";
import {Action_PickUpTarget} from "../Action/PickUpTarget";

export = new Tree_Tree(
    "Transporter",
    new Tree_Composite_Priority([
        new Tree_Composite_Sequence([
            new Tree_Decorator_Inverter(
                new Check_AllStoragesFilled(),
            ),
            new Action_AssignNearestUnfilledStorageAsTarget(),
            new Tree_Composite_Priority([
                new Action_TransferToTarget(RESOURCE_ENERGY),
                new Action_MoveToTarget(),
            ]),
        ]),
        new Tree_Composite_Sequence([
            new Tree_Decorator_Inverter(
                new Check_AllSpawnsFilled(),
            ),
            new Action_AssignNearestSpawnInNeedOfEnergyAsTarget(),
            new Tree_Composite_Priority([
                new Action_TransferToTarget(RESOURCE_ENERGY),
                new Action_MoveToTarget(),
            ]),
        ]),
        new Tree_Composite_Sequence([
            new Check_DroppedEnergyAvailable(),
            new Action_AssignNearestDroppedEnergyAsTarget(),
            new Tree_Composite_Priority([
                new Action_PickUpTarget(),
                new Action_MoveToTarget(),
            ]),
        ]),
    ]),
);
