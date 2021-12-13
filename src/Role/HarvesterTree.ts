import {Tree_Composite_Priority} from "../Tree/Composite/Priority";
import {Action_AssignHighestPrioritySourceAsTarget} from "../Action/AssignHighestPrioritySourceAsTarget";
import {Action_HarvestTarget} from "../Action/HarvestTarget";
import {Action_MoveToTarget} from "../Action/MoveToTarget";
import {Tree_Composite_Sequence} from "../Tree/Composite/Sequence";
import {Check_RoomHasCreepsOfRole} from "../Check/RoomHasCreepsOfRole";
import {Check_TargetSourceHasAttachedContainer} from "../Check/TargetSourceHasAttachedContainer";
import {Action_AssignAttachedContainerOfSourceAsTarget} from "../Action/AssignAttachedContainerOfSourceAsTarget";
import {Action_TransferToTarget} from "../Action/TransferToTarget";
import {Check_HasConstructionSiteNearTarget} from "../Check/HasContstructionSiteNearTarget";
import {Action_CreateConstructionSiteNearTarget} from "../Action/CreateContstructionSiteNearTarget";
import {Action_AssignNearestConstructionSiteAsTarget} from "../Action/AssignNearestConstructionSiteAsTarget";
import {Action_BuildTarget} from "../Action/BuildTarget";
import {Action_AssignNearestSpawnInNeedOfEnergyAsTarget} from "../Action/AssignNearestSpawnInNeedOfEnergyAsTarget";
import {Tree_Composite_MemoryPriority} from "../Tree/Composite/MemoryPriority";
import {Tree_Tree} from "../Tree/Tree";
import {Check_IsInTargetRoom} from "../Check/IsInTargetRoom";
import {Action_MoveToTargetRoom} from "../Action/MoveToTargetRoom";
import {ROLE_SPAWN_SUPPLIER} from "../Constants";
import {Action_ChangeTargetRoom} from "../Action/ChangeTargetRoom";
import RoomRepository from "../Repository/RoomRepository";
import {Check_CreepCanCarryMore} from "../Check/CreepCanCarryMore";
import {Check_ASpawnsIsInNeedOfEnergy} from "../Check/ASpawnsIsInNeedOfEnergy";
import {Check_IsNotInHomeRoom} from "../Check/IsNotInHomeRoom";
import {Check_TargetContainerIsNotFull} from "../Check/TargetContainerIsNotFull";
import {Check_CreepCarriesEnergy} from '../Check/CreepCarriesEnergy';

export = new Tree_Tree(
    "Harvester",
    // @todo extract chunks to reusable "feature sets" to be able to reuse them and increase readability
    new Tree_Composite_Sequence([
        new Tree_Composite_Priority([
            new Check_IsInTargetRoom(),
            new Action_MoveToTargetRoom(),
        ]),
        new Tree_Composite_MemoryPriority([
            new Tree_Composite_Sequence([
                new Check_CreepCanCarryMore(),
                new Action_AssignHighestPrioritySourceAsTarget(),
                new Tree_Composite_Priority([
                    new Action_HarvestTarget(),
                    new Action_MoveToTarget(),
                ]),
            ]),
            new Tree_Composite_Sequence([
                new Tree_Composite_Priority([
                    new Check_RoomHasCreepsOfRole(ROLE_SPAWN_SUPPLIER, 1),
                    new Check_IsNotInHomeRoom(),
                ]),
                new Tree_Composite_Priority([
                    new Tree_Composite_Sequence([
                        new Action_AssignHighestPrioritySourceAsTarget(),
                        new Check_TargetSourceHasAttachedContainer(),
                        new Action_AssignAttachedContainerOfSourceAsTarget(),
                        new Check_TargetContainerIsNotFull(),
                        new Tree_Composite_Priority([
                            new Action_TransferToTarget(RESOURCE_ENERGY),
                            new Action_MoveToTarget(),
                        ]),
                    ]),
                    new Tree_Composite_Sequence([
                        new Action_AssignHighestPrioritySourceAsTarget(),
                        new Tree_Composite_Priority([
                            new Check_HasConstructionSiteNearTarget(STRUCTURE_CONTAINER, 1),
                            new Action_CreateConstructionSiteNearTarget(STRUCTURE_CONTAINER, 1),
                        ]),
                        new Action_AssignNearestConstructionSiteAsTarget(),
                        new Tree_Composite_Priority([
                            new Action_BuildTarget(),
                            new Action_MoveToTarget(),
                        ]),
                    ]),
                ]),
            ]),
            new Tree_Composite_Sequence([
                new Check_ASpawnsIsInNeedOfEnergy(),
                new Check_CreepCarriesEnergy(),
                new Action_AssignNearestSpawnInNeedOfEnergyAsTarget(),
                new Tree_Composite_Priority([
                    new Action_TransferToTarget(RESOURCE_ENERGY),
                    new Action_MoveToTarget(),
                ]),
            ]),
            new Action_ChangeTargetRoom(new RoomRepository()),
        ]),
    ]),
);
