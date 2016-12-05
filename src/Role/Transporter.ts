import {Tree_Tree} from "../Tree/Tree_Tree";
import {Tree_Composite_Priority} from "../Tree/Composite/Priority";
import {Check_DroppedEnergyAvailable} from "../Check/DroppedEnergyAvailable";
import {Action_PickUp} from "../Action/PickUp";
import {Tree_Composite_Sequence} from "../Tree/Composite/Sequence";
import {Check_AllSpawnsFilled} from "../Check/AllSpawnsFilled";
import {Tree_Decorator_Inverter} from "../Tree/Decorator/Inverter";
import {Check_AllStoragesFilled} from "../Check/AllStoragesFilled";
import {Action_AssignNearestUnfilledStorageAsTarget} from "../Action/AssignNearestUnfilledStorageAsTarget";
import {Action_AssignNearestSpawnInNeedOfEnergyAsTarget} from "../Action/AssignNearestSpawnInNeedOfEnergyAsTarget";
import {Action_AssignNearestDroppedEnergyAsTarget} from "../Action/AssignNearestDroppedEnergyAsTarget";
import {Action_MoveToTarget} from "../Action/MoveToTarget";
import {Action_TransferToTarget} from "../Action/TransferToTarget";
import {Role_Role} from "./Role";

/**
 * transports harvested energy to containers
 */
export class Role_Transporter extends Role_Role {

    public static bodyParts(energyCapacityAvailable: number): string[] {
        if (energyCapacityAvailable < 550) {
            return [CARRY, CARRY, CARRY, MOVE, MOVE, MOVE];
        } else {
            return [CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE];
        }
    }

    public name(): string {
        return "Transporter";
    }

    public tree(): Tree_Tree {
        return new Tree_Tree(
            "Transporter",
            new Tree_Composite_Priority([
                new Tree_Composite_Sequence([
                    new Tree_Decorator_Inverter(
                        new Check_AllStoragesFilled(this.creep.room),
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
                    new Check_DroppedEnergyAvailable(this.creep),
                    new Action_AssignNearestDroppedEnergyAsTarget(),
                    new Tree_Composite_Priority([
                        new Action_PickUp(this.creep, this.creep.room.findNearestDroppedEnergy(this.creep)[0]),
                        new Action_MoveToTarget(),
                    ]),
                ]),
            ]),
        );
    }
}
