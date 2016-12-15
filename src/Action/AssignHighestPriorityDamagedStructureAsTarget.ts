import {Action_AssignAsTarget} from "./AssignAsTarget";

export class Action_AssignHighestPriorityDamagedStructureAsTarget extends Action_AssignAsTarget {

    public findTarget(repairer: Creep|StructureTower) {
        return repairer.room.findStructures().notWall().notRampart().whichHaveNotMaxHitpoints().closestByPath(repairer.pos);
    }
}
