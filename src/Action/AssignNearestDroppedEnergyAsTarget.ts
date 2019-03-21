import {Action_AssignAsTarget} from "./AssignAsTarget";
import {Tree_Core_Tick} from "../Tree/Core/Tick";

export class Action_AssignNearestDroppedEnergyAsTarget extends Action_AssignAsTarget {

    public findTarget(creep: Creep): Resource {
        return creep.room.findDroppedResources().is(RESOURCE_ENERGY).closestByPath(creep.pos);
    }

    public getDescription(tick: Tree_Core_Tick): string {
        const creep = tick.target as Creep;
        const roomPosition = this.findTarget(creep).pos;

        return "My new target is the dropped energy at " + roomPosition.x + "|" + roomPosition.y + ".";
    }
}
