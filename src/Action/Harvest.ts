import { Action_Action } from "./Action";

export class Action_Harvest extends Action_Action {
    private name = "Harvest";
    public execute(target: Source) {
        if (this.creep.harvest(target) === ERR_NOT_IN_RANGE) {
            this.creep.moveTo(target);
        }
    }
}
