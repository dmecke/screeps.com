import {Action_AssignAsTarget} from "./AssignAsTarget";

export class Action_AssignHighestPrioritySourceAsTarget extends Action_AssignAsTarget {

    public findTarget(creep: Creep) {
        return creep.room.findSourcesByPriority(creep)[0];
    }
}
