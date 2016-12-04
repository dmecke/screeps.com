import {Action_AssignAsTarget} from "./AssignAsTarget";

export class Action_AssignNearestHostileCreepAsTarget extends Action_AssignAsTarget {

    public findTarget(creep: Creep) {
        return creep.pos.findClosestByPath(FIND_HOSTILE_CREEPS) as Creep;
    }
}
