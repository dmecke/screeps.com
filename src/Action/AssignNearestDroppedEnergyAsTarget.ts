import {Action_AssignAsTarget} from "./AssignAsTarget";

export class Action_AssignNearestDroppedEnergyAsTarget extends Action_AssignAsTarget {

    public findTarget(creep: Creep) {
        return creep.room.findNearestDroppedEnergy(creep)[0];
    }
}
