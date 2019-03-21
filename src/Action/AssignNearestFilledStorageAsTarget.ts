import {Action_AssignAsTarget} from "./AssignAsTarget";
import {Tree_Core_Tick} from "../Tree/Core/Tick";

export class Action_AssignNearestFilledStorageAsTarget extends Action_AssignAsTarget {

    public findTarget(creep: Creep): StructureStorage|StructureContainer {
        return creep.room.findDepots().contains(RESOURCE_ENERGY).closestByPath(creep.pos);
    }

    public getDescription(tick: Tree_Core_Tick): string {
        const creep = tick.target as Creep;
        const roomPosition = this.findTarget(creep).pos;

        return "My new target is the nearest filled storage at " + roomPosition.x + "|" + roomPosition.y + ".";
    }
}
