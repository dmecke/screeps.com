import {Role_Role} from "./Role";
import {Tree_Tree} from "../Tree/Tree_Tree";
import {Tree_Composite_Priority} from "../Tree/Composite/Priority";
import {Tree_Action_CreepIsAtCarryAmount} from "../Tree/Action/CreepIsAtCarryAmount";
import {Tree_Action_UpgradeController} from "../Tree/Action/UpgradeController";
import {Tree_Action_MoveTo} from "../Tree/Action/MoveTo";
import {Tree_Decorator_Inverter} from "../Tree/Decorator/Inverter";
import {Tree_Composite_Sequence} from "../Tree/Composite/Sequence";
import {Tree_Action_PickUp} from "../Tree/Action/PickUp";
import {Tree_Action_DroppedEnergyAvailable} from "../Tree/Action/DroppedEnergyAvailable";
import {Tree_Action_Withdraw} from "../Tree/Action/Withdraw";
import {Tree_Action_Harvest} from "../Tree/Action/Harvest";
import {Tree_Action_Repair} from "../Tree/Action/Repair";
import {Tree_Action_Build} from "../Tree/Action/Build";

/**
 * repairs and builds structures; helps with upgrading when nothing to do
 */
export class Role_Builder extends Role_Role {

    public static role(): string {
        return "Builder";
    }

    public constructor(creep: Creep) {
        let room = creep.room;

        let tree = new Tree_Tree(
            new Tree_Composite_Priority([
                new Tree_Composite_Priority([
                    new Tree_Decorator_Inverter(
                        new Tree_Action_CreepIsAtCarryAmount(creep, 0),
                    ),
                    new Tree_Action_Repair(creep, room.findDamagedStructuresByPriority(creep)[0]),
                    new Tree_Action_MoveTo(creep, room.findDamagedStructuresByPriority(creep)[0]),
                ]),
                new Tree_Composite_Priority([
                    new Tree_Decorator_Inverter(
                        new Tree_Action_CreepIsAtCarryAmount(creep, 0),
                    ),
                    new Tree_Action_Build(creep, room.findConstructionSitesByPriority(creep)[0]),
                    new Tree_Action_MoveTo(creep, room.findConstructionSitesByPriority(creep)[0]),
                ]),
                new Tree_Composite_Sequence([
                    new Tree_Decorator_Inverter(
                        new Tree_Action_CreepIsAtCarryAmount(creep, 0),
                    ),
                    new Tree_Composite_Priority([
                        new Tree_Action_UpgradeController(creep),
                        new Tree_Action_MoveTo(creep, room.controller),
                    ]),
                ]),
                new Tree_Composite_Sequence([
                    new Tree_Action_DroppedEnergyAvailable(creep, 5),
                    new Tree_Composite_Priority([
                        new Tree_Action_PickUp(creep, room.findNearestDroppedEnergy(creep)[0]),
                        new Tree_Action_MoveTo(creep, room.findNearestDroppedEnergy(creep)[0]),
                    ]),
                ]),
                new Tree_Composite_Priority([
                    new Tree_Action_Withdraw(creep, room.findNearestFilledStorage(creep)[0], RESOURCE_ENERGY),
                    new Tree_Action_MoveTo(creep, room.findNearestFilledStorage(creep)[0]),
                ]),
                new Tree_Composite_Sequence([
                    new Tree_Decorator_Inverter(
                        new Tree_Action_CreepIsAtCarryAmount(creep, creep.carryCapacity),
                    ),
                    new Tree_Composite_Priority([
                        new Tree_Action_Harvest(creep, room.findSourcesByPriority(creep)[0]),
                        new Tree_Action_MoveTo(creep, room.findSourcesByPriority(creep)[0]),
                    ]),
                ]),
            ]),
        );

        super(creep, tree);
    }
}
