import {Action_AssignAsTarget} from "./AssignAsTarget";

export class Action_AssignNearestConstructionSiteAsTarget extends Action_AssignAsTarget {

    public findTarget(creep: Creep) {
        return creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES) as ConstructionSite;
    }
}
