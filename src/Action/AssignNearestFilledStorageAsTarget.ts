import {Action_AssignAsTarget} from "./AssignAsTarget";

export class Action_AssignNearestFilledStorageAsTarget extends Action_AssignAsTarget {

    public findTarget(creep: Creep): StructureStorage|StructureContainer {
        return creep.findNearestFilledStorage();
    }
}
