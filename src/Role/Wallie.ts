import {Role_Role} from "./Role";
import {Tree_Tree} from "../Tree/Tree_Tree";
import {Tree_Composite_Priority} from "../Tree/Composite/Priority";
import {Tree_Action_MoveTo} from "../Tree/Action/MoveTo";
import {Tree_Action_Withdraw} from "../Tree/Action/Withdraw";
import {Tree_Action_PickUp} from "../Tree/Action/PickUp";
import {Tree_Action_DroppedEnergyAvailable} from "../Tree/Action/DroppedEnergyAvailable";
import {Tree_Composite_Sequence} from "../Tree/Composite/Sequence";
import {Tree_Action_UpgradeController} from "../Tree/Action/UpgradeController";
import {Tree_Action_CreepIsAtCarryAmount} from "../Tree/Action/CreepIsAtCarryAmount";
import {Tree_Decorator_Inverter} from "../Tree/Decorator/Inverter";
import {Tree_Action_Repair} from "../Tree/Action/Repair";

/**
 * repairs walls and ramparts
 */
export class Role_Wallie extends Role_Role {

    public static role(): string {
        return "Wallie";
    }

    public constructor(creep: Creep) {
        let room = creep.room;

        let tree = new Tree_Tree(
            creep,
            new Tree_Composite_Priority([
                new Tree_Composite_Sequence([
                    new Tree_Decorator_Inverter(
                        new Tree_Action_CreepIsAtCarryAmount(creep, 0),
                    ),
                    new Tree_Composite_Priority([
                        new Tree_Action_Repair(creep, room.findDamagedWallsByPriority()[0]),
                        new Tree_Action_MoveTo(creep, room.findDamagedWallsByPriority()[0]),
                    ]),
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
            ]),
        );

        super(creep, tree);
    }
}
