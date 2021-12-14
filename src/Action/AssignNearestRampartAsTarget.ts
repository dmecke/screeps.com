import {Action_AssignAsTarget} from "./AssignAsTarget";

export class Action_AssignNearestRampartAsTarget extends Action_AssignAsTarget {

    public findTarget(creep: Creep) {
        return creep.room.findWallsAndRamparts().filterOnlyRamparts().closestByPath(creep.pos);
    }
}
