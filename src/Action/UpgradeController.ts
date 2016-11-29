import { Action_Action } from "./Action";

export class Action_UpgradeController extends Action_Action {
    private name = "UpgradeController";
    public execute(target: Controller) {
        if (this.creep.upgradeController(target) === ERR_NOT_IN_RANGE) {
            this.creep.moveTo(target);
        }
    }
}
