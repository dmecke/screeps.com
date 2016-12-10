import {Action_AssignAsTarget} from "./AssignAsTarget";

export class Action_AssignNearestUnfilledControllerStorageAsTarget extends Action_AssignAsTarget {

    public findTarget(creep: Creep) {
        return creep.findNearestUnfilledControllerStorage();
    }
}
