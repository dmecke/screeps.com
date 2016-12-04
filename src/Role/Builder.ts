import {Role_Role} from "./Role";
import {Tree_Tree} from "../Tree/Tree_Tree";
import {Tree_Composite_Priority} from "../Tree/Composite/Priority";
import {Check_CreepIsAtCarryAmount} from "../Check/CreepIsAtCarryAmount";
import {Action_UpgradeController} from "../Action/UpgradeController";
import {Action_MoveTo} from "../Action/MoveTo";
import {Tree_Decorator_Inverter} from "../Tree/Decorator/Inverter";
import {Tree_Composite_Sequence} from "../Tree/Composite/Sequence";
import {Action_PickUp} from "../Action/PickUp";
import {Check_DroppedEnergyAvailable} from "../Check/DroppedEnergyAvailable";
import {Action_Withdraw} from "../Action/Withdraw";
import {Action_Harvest} from "../Action/Harvest";
import {Action_Repair} from "../Action/Repair";
import {Action_Build} from "../Action/Build";

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
            creep,
            new Tree_Composite_Priority([
                new Tree_Composite_Sequence([
                    new Tree_Decorator_Inverter(
                        new Check_CreepIsAtCarryAmount(creep, 0),
                    ),
                    new Tree_Composite_Priority([
                        new Action_Repair(creep, room.findDamagedStructuresByPriority(creep)[0]),
                        new Action_MoveTo(creep, room.findDamagedStructuresByPriority(creep)[0]),
                    ]),
                ]),
                new Tree_Composite_Sequence([
                    new Tree_Decorator_Inverter(
                        new Check_CreepIsAtCarryAmount(creep, 0),
                    ),
                    new Tree_Composite_Priority([
                        new Action_Build(creep, room.findConstructionSitesByPriority(creep)[0]),
                        new Action_MoveTo(creep, room.findConstructionSitesByPriority(creep)[0]),
                    ]),
                ]),
                new Tree_Composite_Sequence([
                    new Tree_Decorator_Inverter(
                        new Check_CreepIsAtCarryAmount(creep, 0),
                    ),
                    new Tree_Composite_Priority([
                        new Action_UpgradeController(creep),
                        new Action_MoveTo(creep, room.controller),
                    ]),
                ]),
                new Tree_Composite_Sequence([
                    new Check_DroppedEnergyAvailable(creep, 5),
                    new Tree_Composite_Priority([
                        new Action_PickUp(creep, room.findNearestDroppedEnergy(creep)[0]),
                        new Action_MoveTo(creep, room.findNearestDroppedEnergy(creep)[0]),
                    ]),
                ]),
                new Tree_Composite_Priority([
                    new Action_Withdraw(creep, room.findNearestFilledStorage(creep)[0], RESOURCE_ENERGY),
                    new Action_MoveTo(creep, room.findNearestFilledStorage(creep)[0]),
                ]),
                new Tree_Composite_Sequence([
                    new Tree_Decorator_Inverter(
                        new Check_CreepIsAtCarryAmount(creep, creep.carryCapacity),
                    ),
                    new Tree_Composite_Priority([
                        new Action_Harvest(creep, room.findSourcesByPriority(creep)[0]),
                        new Action_MoveTo(creep, room.findSourcesByPriority(creep)[0]),
                    ]),
                ]),
            ]),
        );

        super(creep, tree);
    }
}
