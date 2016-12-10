import {Action_AssignAsTarget} from "./AssignAsTarget";

export class Action_AssignNearestFilledSourceStorageAsTarget extends Action_AssignAsTarget {

    public findTarget(creep: Creep): StructureStorage|StructureContainer {
        return creep.findNearestFilledSourceStorage();
    }
}
