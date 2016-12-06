import {Tree_Tree} from "../Tree/Tree_Tree";
import {Tree_Composite_Priority} from "../Tree/Composite/Priority";
import {Action_UpgradeController} from "../Action/UpgradeController";
import {Tree_Decorator_Inverter} from "../Tree/Decorator/Inverter";
import {Tree_Composite_Sequence} from "../Tree/Composite/Sequence";
import {Action_PickUp} from "../Action/PickUp";
import {Check_DroppedEnergyAvailable} from "../Check/DroppedEnergyAvailable";
import {Action_Withdraw} from "../Action/Withdraw";
import {Action_Repair} from "../Action/Repair";
import {Check_CreepCarriesNothing} from "../Check/CreepCarriesNothing";
import {Action_AssignHighestPriorityDamagedStructureAsTarget} from "../Action/AssignHighestPriorityDamagedStructureAsTarget";
import {Action_AssignHighestPriorityConstructionSiteAsTarget} from "../Action/AssignHighestPriorityConstructionSiteAsTarget";
import {Check_CreepIsAtCarryLimit} from "../Check/CreepIsAtCarryLimit";
import {Action_AssignHighestPrioritySourceAsTarget} from "../Action/AssignHighestPrioritySourceAsTarget";
import {Action_AssignControllerAsTarget} from "../Action/AssignControllerAsTarget";
import {Action_AssignNearestDroppedEnergyAsTarget} from "../Action/AssignNearestDroppedEnergyAsTarget";
import {Action_AssignNearestFilledStorageAsTarget} from "../Action/AssignNearestFilledStorageAsTarget";
import {Action_MoveToTarget} from "../Action/MoveToTarget";
import {Action_HarvestTarget} from "../Action/HarvestTarget";
import {Action_BuildTarget} from "../Action/BuildTarget";
import {Role_Role} from "./Role";

/**
 * repairs and builds structures; helps with upgrading when nothing to do
 */
export class Role_Builder extends Role_Role {

    public static bodyParts(energyCapacityAvailable: number): string[] {
        if (energyCapacityAvailable < 550) {
            return [WORK, CARRY, MOVE, MOVE, MOVE];
        } else {
            return [WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE];
        }
    }

    public name(): string {
        return "Builder";
    }

    public tree(): Tree_Tree {
        return new Tree_Tree(
            "Builder",
            new Tree_Composite_Priority([
                new Tree_Composite_Sequence([
                    new Tree_Decorator_Inverter(
                        new Check_CreepCarriesNothing(),
                    ),
                    new Action_AssignHighestPriorityDamagedStructureAsTarget(),
                    new Tree_Composite_Priority([
                        new Action_Repair(this.creep, this.creep.room.findDamagedStructuresByPriority(this.creep)[0]),
                        new Action_MoveToTarget(),
                    ]),
                ]),
                new Tree_Composite_Sequence([
                    new Tree_Decorator_Inverter(
                        new Check_CreepCarriesNothing(),
                    ),
                    new Action_AssignHighestPriorityConstructionSiteAsTarget(),
                    new Tree_Composite_Priority([
                        new Action_BuildTarget(),
                        new Action_MoveToTarget(),
                    ]),
                ]),
                new Tree_Composite_Sequence([
                    new Tree_Decorator_Inverter(
                        new Check_CreepCarriesNothing(),
                    ),
                    new Action_AssignControllerAsTarget(),
                    new Tree_Composite_Priority([
                        new Action_UpgradeController(this.creep),
                        new Action_MoveToTarget(),
                    ]),
                ]),
                new Tree_Composite_Sequence([
                    new Check_DroppedEnergyAvailable(this.creep, 5),
                    new Action_AssignNearestDroppedEnergyAsTarget(),
                    new Tree_Composite_Priority([
                        new Action_PickUp(this.creep, this.creep.room.findNearestDroppedEnergy(this.creep)[0]),
                        new Action_MoveToTarget(),
                    ]),
                ]),
                new Tree_Composite_Sequence([
                    new Action_AssignNearestFilledStorageAsTarget(),
                    new Tree_Composite_Priority([
                        new Action_Withdraw(this.creep, this.creep.findNearestFilledStorage(), RESOURCE_ENERGY),
                        new Action_MoveToTarget(),
                    ]),
                ]),
                new Tree_Composite_Sequence([
                    new Tree_Decorator_Inverter(
                        new Check_CreepIsAtCarryLimit(),
                    ),
                    new Action_AssignHighestPrioritySourceAsTarget(),
                    new Tree_Composite_Priority([
                        new Action_HarvestTarget(),
                        new Action_MoveToTarget(),
                    ]),
                ]),
            ]),
        );
    }
}
