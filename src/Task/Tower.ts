import {Task_Task} from "./Task";
import {Tree_Tree} from "../Tree/Tree";
import {Tree_Composite_Priority} from "../Tree/Composite/Priority";
import {Tree_Core_Blackboard} from "../Tree/Core/Blackboard";
import {Tree_Composite_Sequence} from "../Tree/Composite/Sequence";
import {Action_RepairTarget} from "../Action/RepairTarget";
import {Action_AssignHighestPriorityDamagedStructureAsTarget} from "../Action/AssignHighestPriorityDamagedStructureAsTarget";
import {Check_TowerHasEnergy} from "../Check/HasEnergy";
import {Action_AssignNearestHostileCreepAsTarget} from "../Action/AssignNearestHostileCreepAsTarget";
import {Action_TowerAttackTarget} from "../Action/TowerAttackTarget";

export class Task_Tower extends Task_Task {
    public execute(): void {
        for (const name in Game.rooms) {
            if (Game.rooms.hasOwnProperty(name)) {
                this.handleRoom(Game.rooms[name]);
            }
        }
    }

    private handleRoom(room: Room): void {
        this.initializeRoomTowerMemory(room);

        const towers = room.find(FIND_MY_STRUCTURES, {
            filter: (structure: Structure) => structure.structureType === STRUCTURE_TOWER,
        }) as StructureTower[];

        for (const tower of towers) {
            this.tree().tick(tower, new Tree_Core_Blackboard(tower));
        }
    }

    private initializeRoomTowerMemory(room: Room): void {
        const roomMemory = Memory.rooms[room.name];
        if (roomMemory === undefined) {
            return;
        }

        if (!roomMemory.hasOwnProperty("towers")) {
            roomMemory.towers = {};
        }
    }

    private tree(): Tree_Tree {
        return new Tree_Tree(
            "Tower",
            new Tree_Composite_Priority([
                new Tree_Composite_Sequence([
                    new Check_TowerHasEnergy(),
                    new Action_AssignNearestHostileCreepAsTarget(),
                    new Action_TowerAttackTarget(),
                ]),
                // new Tree_Composite_Sequence([
                    // @todo
                    // new Check_HasEnergy(),
                    // new Action_HealCreep(),
                // ]),
                new Tree_Composite_Sequence([
                    new Action_AssignHighestPriorityDamagedStructureAsTarget(),
                    new Action_RepairTarget(),
                ]),
            ]),
        );
    }
}
