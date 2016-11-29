import { Action_Action } from "./Action";

export class Action_TransferEnergy extends Action_Action {
    private name = "TransferEnergy";

    public execute(target: Structure) {
        if (this.creep.transfer(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
            this.creep.moveTo(target);
        }
    }
}
