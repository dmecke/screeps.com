import {Role_Role} from "./Role";
import {Tree_Tree} from "../Tree/Tree_Tree";
import {Tree_Decorator_Inverter} from "../Tree/Decorator/Inverter";
import {Tree_Composite_Priority} from "../Tree/Composite/Priority";
import {Tree_Composite_Sequence} from "../Tree/Composite/Sequence";
import {Tree_Action_RoomHasCreepsOfRole} from "../Tree/Action/RoomHasCreepsOfRole";
import {Tree_Action_MoveTo} from "../Tree/Action/MoveTo";
import {Tree_Action_Harvest} from "../Tree/Action/Harvest";
import {Tree_Action_AllSpawnsFilled} from "../Tree/Action/AllSpawnsFilled";
import {Tree_Action_Transfer} from "../Tree/Action/Transfer";
import {Tree_Action_CreepIsAtCarryAmount} from "../Tree/Action/CreepIsAtCarryAmount";
import {Tree_Action_Build} from "../Tree/Action/Build";
import {Tree_Action_SourceHasAttachedContainer} from "../Tree/Action/SourceHasAttachedContainer";
import {Tree_Action_HasConstructionSiteNear} from "../Tree/Action/HasContstructionSiteNear";
import {Tree_Action_CreateConstructionSiteNear} from "../Tree/Action/CreateContstructionSiteNear";

/**
 * harvests energy
 */
export class Role_Harvester extends Role_Role {

    public static role(): string {
        return "Harvester";
    }

    public constructor(creep: Creep) {
        let room = creep.room;
        let bestSource = room.findSourcesByPriority(creep)[0];
        let transferEnergyTarget = room.findNearestSpawnInNeedOfEnergy(creep);

        let tree = new Tree_Tree(
            creep,
            new Tree_Composite_Priority([
                new Tree_Composite_Sequence([
                    new Tree_Decorator_Inverter(
                        new Tree_Action_CreepIsAtCarryAmount(creep, creep.carryCapacity),
                    ),
                    new Tree_Composite_Priority([
                        new Tree_Action_Harvest(creep, bestSource),
                        new Tree_Action_MoveTo(creep, bestSource),
                    ]),
                ]),
                new Tree_Composite_Sequence([
                    new Tree_Action_CreepIsAtCarryAmount(creep, creep.carryCapacity),
                    new Tree_Action_RoomHasCreepsOfRole(room, "SpawnSupplier", 1),
                    new Tree_Composite_Priority([
                        new Tree_Composite_Sequence([
                            new Tree_Action_SourceHasAttachedContainer(bestSource),
                            new Tree_Composite_Priority([
                                new Tree_Action_Transfer(creep, RESOURCE_ENERGY, bestSource.attachedContainer()),
                                new Tree_Action_MoveTo(creep, bestSource.attachedContainer()),
                            ]),
                        ]),
                        new Tree_Composite_Sequence([
                            new Tree_Composite_Priority([
                                new Tree_Action_HasConstructionSiteNear(bestSource.pos, STRUCTURE_CONTAINER, 2),
                                new Tree_Action_CreateConstructionSiteNear(bestSource.pos, STRUCTURE_CONTAINER, 2),
                            ]),
                            new Tree_Composite_Priority([
                                new Tree_Action_Build(creep, creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES) as ConstructionSite),
                                new Tree_Action_MoveTo(creep, creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES) as ConstructionSite),
                            ]),
                        ]),
                    ]),
                ]),
                new Tree_Composite_Sequence([
                    new Tree_Decorator_Inverter(
                        new Tree_Action_AllSpawnsFilled(room),
                    ),
                    new Tree_Composite_Priority([
                        new Tree_Action_Transfer(creep, RESOURCE_ENERGY, transferEnergyTarget),
                        new Tree_Action_MoveTo(creep, transferEnergyTarget),
                    ]),
                ]),
            ]),
        );

        super(creep, tree);
    }
}
