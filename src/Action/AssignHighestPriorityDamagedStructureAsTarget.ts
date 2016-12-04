import {Action_AssignAsTarget} from "./AssignAsTarget";

export class Action_AssignHighestPriorityDamagedStructureAsTarget extends Action_AssignAsTarget {

    public findTarget(creep: Creep) {
        return creep.room.findDamagedStructuresByPriority(creep)[0];
    }
}
