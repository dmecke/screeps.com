import {Action_AssignAsTarget} from "./AssignAsTarget";

export class Action_AssignNearestHostileCreepAsTarget extends Action_AssignAsTarget {

    public findTarget(creep: Creep) {
        let creep = creep.pos.findClosestByPath(FIND_HOSTILE_CREEPS) as Creep;
        if (creep === undefined) {
            creep = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS) as Creep;
        }

        return creep;
    }
}
