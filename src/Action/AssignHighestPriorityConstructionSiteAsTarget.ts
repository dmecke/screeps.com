import {Action_AssignAsTarget} from "./AssignAsTarget";

export class Action_AssignHighestPriorityConstructionSiteAsTarget extends Action_AssignAsTarget {

    public findTarget(creep: Creep) {
        return creep.room.findConstructionSitesByPriority(creep)[0];
    }
}
