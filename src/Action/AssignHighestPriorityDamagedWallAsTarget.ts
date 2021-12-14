import {Action_AssignAsTarget} from "./AssignAsTarget";

export class Action_AssignHighestPriorityDamagedWallAsTarget extends Action_AssignAsTarget {

    public findTarget(creep: Creep) {
        // @todo take distance into account to avoid moving back and forth on the map between two damaged walls
        return creep.room.findWallsAndRamparts().withNotMaxHitpoints().orderByPriority().first();
    }
}
