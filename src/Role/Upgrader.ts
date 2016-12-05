import {Tree_Tree} from "../Tree/Tree_Tree";
import {Tree_Composite_Priority} from "../Tree/Composite/Priority";
import {Tree_Composite_Sequence} from "../Tree/Composite/Sequence";
import {Tree_Decorator_Inverter} from "../Tree/Decorator/Inverter";
import {Check_DroppedEnergyAvailable} from "../Check/DroppedEnergyAvailable";
import {Action_Withdraw} from "../Action/Withdraw";
import {Action_PickUp} from "../Action/PickUp";
import {Action_UpgradeController} from "../Action/UpgradeController";
import {Check_CreepCarriesNothing} from "../Check/CreepCarriesNothing";
import {Action_AssignControllerAsTarget} from "../Action/AssignControllerAsTarget";
import {Action_AssignNearestDroppedEnergyAsTarget} from "../Action/AssignNearestDroppedEnergyAsTarget";
import {Action_AssignNearestFilledStorageAsTarget} from "../Action/AssignNearestFilledStorageAsTarget";
import {Action_MoveToTarget} from "../Action/MoveToTarget";
import {Role_Role} from "./Role_Role";

/**
 * upgrades the controller
 */
export class Role_Upgrader extends Role_Role {

    public static bodyParts(energyCapacityAvailable: number): string[] {
        if (energyCapacityAvailable < 550) {
            return [WORK, CARRY, MOVE, MOVE, MOVE];
        } else {
            return [WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE];
        }
    }

    public name(): string {
        return "Upgrader";
    }

    public tree(): Tree_Tree {
        return new Tree_Tree(
            "Upgrader",
            new Tree_Composite_Priority([
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
                        new Action_Withdraw(this.creep, this.creep.room.findNearestFilledStorage(this.creep)[0], RESOURCE_ENERGY),
                        new Action_MoveToTarget(),
                    ]),
                ]),
            ]),
        );
    }
}
