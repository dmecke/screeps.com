import {Action_AssignAsTarget} from "./AssignAsTarget";

export class Action_AssignControllerAsTarget extends Action_AssignAsTarget {

    protected findTarget(creep: Creep): StructureController {
        return creep.room.controller;
    }
}
