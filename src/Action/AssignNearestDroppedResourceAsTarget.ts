import {Action_AssignAsTarget} from "./AssignAsTarget";

export class Action_AssignNearestDroppedResourceAsTarget extends Action_AssignAsTarget {

    public findTarget(creep: Creep) {
        return creep.room.findNearestDroppedResource(creep)[0];
    }
}
