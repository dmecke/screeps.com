import {Action_AssignAsTarget} from "./AssignAsTarget";

export class Action_AssignControllerAsTarget extends Action_AssignAsTarget {

    protected findTarget(creep: Creep): Controller {
        return creep.room.controller;
    }
}
