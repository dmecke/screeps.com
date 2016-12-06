import {Action_AssignAsTarget} from "./AssignAsTarget";

export class Action_AssignHighestPriorityDamagedStructureAsTarget extends Action_AssignAsTarget {

    public findTarget(repairer: Creep|StructureTower) {
        return repairer.room.findDamagedStructuresByPriority(repairer)[0];
    }
}
