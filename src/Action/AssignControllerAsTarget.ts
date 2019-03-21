import {Action_AssignAsTarget} from "./AssignAsTarget";
import {Tree_Core_Tick} from "../Tree/Core/Tick";

export class Action_AssignControllerAsTarget extends Action_AssignAsTarget {

    public getDescription(tick: Tree_Core_Tick): string {
        const creep = tick.target as Creep;
        const pos = this.findTarget(creep).pos;

        return "My new target is the controller at " + pos.x + "|" + pos.y + ".";
    }

    protected findTarget(creep: Creep): StructureController {
        return creep.room.controller;
    }
}
