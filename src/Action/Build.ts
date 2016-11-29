import { Action_Action } from "./Action";

export class Action_Build extends Action_Action {
    private name = "Build";
    public execute(target: ConstructionSite) {
        if (this.creep.build(target) === ERR_NOT_IN_RANGE) {
            this.creep.moveTo(target);
        }
    }
}
