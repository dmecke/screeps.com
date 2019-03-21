import {Action_AssignAsTarget} from "./AssignAsTarget";
import {Tree_Core_Tick} from "../Tree/Core/Tick";

export class Action_AssignNearestUnfilledControllerStorageAsTarget extends Action_AssignAsTarget {

    public findTarget(creep: Creep) {
        return creep.room.findDepots().notFull().nextToController().closestByPath(creep.pos);
    }

    public getDescription(tick: Tree_Core_Tick): string {
        return "My new target is an unfilled controller storage.";
    }
}
