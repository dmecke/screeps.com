import {Action_AssignAsTarget} from "./AssignAsTarget";

export class Action_AssignNearestSpawnInNeedOfEnergyAsTarget extends Action_AssignAsTarget {

    public findTarget(creep: Creep) {
        return creep.room.findNearestSpawnInNeedOfEnergy(creep);
    }
}
