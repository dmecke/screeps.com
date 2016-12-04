import {Action_AssignAsTarget} from "./AssignAsTarget";

export class Action_AssignHighestPriorityDamagedWallAsTarget extends Action_AssignAsTarget {

    public findTarget(creep: Creep) {
        return creep.room.findDamagedWallsByPriority()[0];
    }
}
