import { Action_Action } from "./Action";

export class Action_Load extends Action_Action {
    private name = "Load";
    public execute(target: Structure) {
        if (this.creep.withdraw(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
            this.creep.moveTo(target);
        }
    }
}
