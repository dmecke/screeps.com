import { Action_Action } from "./Action";

export class Action_Repair extends Action_Action {
    private name = "Repair";

    public execute(target: Structure) {
        if (this.creep.repair(target) === ERR_NOT_IN_RANGE) {
            this.creep.moveTo(target);
        }
    }
}
