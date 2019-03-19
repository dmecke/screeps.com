import {Action_AssignAsTarget} from "./AssignAsTarget";

export class Action_AssignNearestDroppedEnergyAsTarget extends Action_AssignAsTarget {

    public findTarget(creep: Creep): Resource {
        return creep.room.findDroppedResources().is(RESOURCE_ENERGY).closestByPath(creep.pos);
    }
}
