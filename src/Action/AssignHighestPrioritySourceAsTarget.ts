import {Action_AssignAsTarget} from "./AssignAsTarget";
import {Tree_Core_Tick} from "../Tree/Core/Tick";

export class Action_AssignHighestPrioritySourceAsTarget extends Action_AssignAsTarget {

    public findTarget(creep: Creep) {
        return creep.room.findSources().orderByPriority(creep).first();
    }

    public getDescription(tick: Tree_Core_Tick): string {
        const creep = tick.target as Creep;
        const roomPosition = this.findTarget(creep).pos;

        return "My new target is the source with the highest priority at " + roomPosition.x + "|" + roomPosition.y + ".";
    }
}
