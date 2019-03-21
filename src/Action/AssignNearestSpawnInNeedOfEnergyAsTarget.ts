import {Action_AssignAsTarget} from "./AssignAsTarget";
import {Tree_Core_Tick} from "../Tree/Core/Tick";

export class Action_AssignNearestSpawnInNeedOfEnergyAsTarget extends Action_AssignAsTarget {

    public findTarget(creep: Creep) {
        return creep.room.findSpawns().inNeedOfEnergy().closestByPath(creep.pos);
    }

    public getDescription(tick: Tree_Core_Tick): string {

        const creep = tick.target as Creep;
        const roomPosition = this.findTarget(creep).pos;

        return "My new target is the nearest spawn that is in need of energy, which is at " + roomPosition.x + "|" + roomPosition.y + ".";
    }
}
