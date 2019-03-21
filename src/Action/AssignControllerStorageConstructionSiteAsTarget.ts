import {Action_AssignAsTarget} from "./AssignAsTarget";
import {Tree_Core_Tick} from "../Tree/Core/Tick";

export class Action_AssignControllerStorageConstructionSiteAsTarget extends Action_AssignAsTarget {

    public findTarget(creep: Creep) {
        return creep.room.findConstructionSites().filterOnlyContainerForController().first();
    }

    public getDescription(tick: Tree_Core_Tick): string {
        const creep = tick.target as Creep;
        const pos = this.findTarget(creep).pos;

        return "My new target is the controller storage construction site at " + pos.x + "|" + pos.y + ".";
    }
}
