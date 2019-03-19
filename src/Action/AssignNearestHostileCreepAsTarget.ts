import {Action_AssignAsTarget} from "./AssignAsTarget";

export class Action_AssignNearestHostileCreepAsTarget extends Action_AssignAsTarget {

    public findTarget(creep: Creep) {
        const hostileCreep = creep.pos.findClosestByPath(FIND_HOSTILE_CREEPS) as Creep;

        if (hostileCreep !== undefined) {
            return hostileCreep;
        }

        return creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS) as Creep;
    }
}
