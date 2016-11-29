import { Action_Action } from "./Action";

export class Action_Pickup extends Action_Action {
    private name = "Pickup";
    public execute(target: Resource) {
        if (this.creep.pickup(target) === ERR_NOT_IN_RANGE) {
            this.creep.moveTo(target);
        }
    }
}
