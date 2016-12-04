import {Role_Role} from "./Role";
import {Tree_Tree} from "../Tree/Tree_Tree";
import {Tree_Decorator_Inverter} from "../Tree/Decorator/Inverter";
import {Tree_Composite_Priority} from "../Tree/Composite/Priority";
import {Tree_Composite_Sequence} from "../Tree/Composite/Sequence";
import {Check_RoomHasCreepsOfRole} from "../Check/RoomHasCreepsOfRole";
import {Action_MoveTo} from "../Action/MoveTo";
import {Action_Harvest} from "../Action/Harvest";
import {Check_AllSpawnsFilled} from "../Check/AllSpawnsFilled";
import {Action_Transfer} from "../Action/Transfer";
import {Check_CreepIsAtCarryAmount} from "../Check/CreepIsAtCarryAmount";
import {Action_Build} from "../Action/Build";
import {Check_SourceHasAttachedContainer} from "../Check/SourceHasAttachedContainer";
import {Check_HasConstructionSiteNear} from "../Check/HasContstructionSiteNear";
import {Action_CreateConstructionSiteNear} from "../Action/CreateContstructionSiteNear";

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
                        new Check_CreepIsAtCarryAmount(creep, creep.carryCapacity),
                    ),
                    new Tree_Composite_Priority([
                        new Action_Harvest(creep, bestSource),
                        new Action_MoveTo(creep, bestSource),
                    ]),
                ]),
                new Tree_Composite_Sequence([
                    new Check_CreepIsAtCarryAmount(creep, creep.carryCapacity),
                    new Check_RoomHasCreepsOfRole(room, "SpawnSupplier", 1),
                    new Tree_Composite_Priority([
                        new Tree_Composite_Sequence([
                            new Check_SourceHasAttachedContainer(bestSource),
                            new Tree_Composite_Priority([
                                new Action_Transfer(creep, RESOURCE_ENERGY, bestSource.attachedContainer()),
                                new Action_MoveTo(creep, bestSource.attachedContainer()),
                            ]),
                        ]),
                        new Tree_Composite_Sequence([
                            new Tree_Composite_Priority([
                                new Check_HasConstructionSiteNear(bestSource.pos, STRUCTURE_CONTAINER, 2),
                                new Action_CreateConstructionSiteNear(bestSource.pos, STRUCTURE_CONTAINER, 2),
                            ]),
                            new Tree_Composite_Priority([
                                new Action_Build(creep, creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES) as ConstructionSite),
                                new Action_MoveTo(creep, creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES) as ConstructionSite),
                            ]),
                        ]),
                    ]),
                ]),
                new Tree_Composite_Sequence([
                    new Tree_Decorator_Inverter(
                        new Check_AllSpawnsFilled(room),
                    ),
                    new Tree_Composite_Priority([
                        new Action_Transfer(creep, RESOURCE_ENERGY, transferEnergyTarget),
                        new Action_MoveTo(creep, transferEnergyTarget),
                    ]),
                ]),
            ]),
        );

        super(creep, tree);
    }
}
