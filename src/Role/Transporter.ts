import {Role_Role} from "./Role";
import {Tree_Tree} from "../Tree/Tree_Tree";
import {Tree_Composite_Priority} from "../Tree/Composite/Priority";
import {Tree_Action_DroppedEnergyAvailable} from "../Tree/Action/DroppedEnergyAvailable";
import {Tree_Action_PickUp} from "../Tree/Action/PickUp";
import {Tree_Action_MoveTo} from "../Tree/Action/MoveTo";
import {Tree_Composite_Sequence} from "../Tree/Composite/Sequence";
import {Tree_Action_AllSpawnsFilled} from "../Tree/Action/AllSpawnsFilled";
import {Tree_Decorator_Inverter} from "../Tree/Decorator/Inverter";
import {Tree_Action_Transfer} from "../Tree/Action/Transfer";
import {Tree_Action_AllStoragesFilled} from "../Tree/Action/AllStoragesFilled";

/**
 * transports harvested energy to containers
 */
export class Role_Transporter extends Role_Role {

    public static role(): string {
        return "Transporter";
    }

    public constructor(creep: Creep) {
        let room = creep.room;

        let tree = new Tree_Tree(
            creep,
            new Tree_Composite_Priority([
                new Tree_Composite_Sequence([
                    new Tree_Decorator_Inverter(
                        new Tree_Action_AllStoragesFilled(room),
                    ),
                    new Tree_Composite_Priority([
                        new Tree_Action_Transfer(creep, RESOURCE_ENERGY, room.findNearestUnfilledStorage(creep)[0]),
                        new Tree_Action_MoveTo(creep, room.findNearestUnfilledStorage(creep)[0]),
                    ]),
                ]),
                new Tree_Composite_Sequence([
                    new Tree_Decorator_Inverter(
                        new Tree_Action_AllSpawnsFilled(room),
                    ),
                    new Tree_Composite_Priority([
                        new Tree_Action_Transfer(creep, RESOURCE_ENERGY, room.findNearestSpawnInNeedOfEnergy(creep)),
                        new Tree_Action_MoveTo(creep, room.findNearestSpawnInNeedOfEnergy(creep)),
                    ]),
                ]),
                new Tree_Composite_Sequence([
                    new Tree_Action_DroppedEnergyAvailable(creep),
                    new Tree_Composite_Priority([
                        new Tree_Action_PickUp(creep, room.findNearestDroppedEnergy(creep)[0]),
                        new Tree_Action_MoveTo(creep, room.findNearestDroppedEnergy(creep)[0]),
                    ]),
                ]),
            ]),
        );

        super(creep, tree);
    }
}
