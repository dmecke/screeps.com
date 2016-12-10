import {Action_AssignAsTarget} from "./AssignAsTarget";

export class Action_AssignNearestTowerInNeedOfEnergyAsTarget extends Action_AssignAsTarget {

    public findTarget(creep: Creep) {
        return creep.room.findTowers().inNeedOfEnergy().closestByPath(creep.pos);
    }
}
