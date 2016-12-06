import {Action_AssignAsTarget} from "./AssignAsTarget";

export class Action_AssignNearestUnfilledStorageAsTarget extends Action_AssignAsTarget {

    public findTarget(creep: Creep) {
        return creep.findNearestUnfilledStorage();
    }
}
