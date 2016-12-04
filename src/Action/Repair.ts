import {Tree_Core_Action} from "../Tree/Core/Action";
import {Settings} from "../Settings";

export class Action_Repair extends Tree_Core_Action {

    private creep: Creep;

    private target: Structure;

    public constructor(creep: Creep, target: Structure) {
        super();
        this.creep = creep;
        this.target = target;
    }

    public tick(): number {
        if (this.creep.repair(this.target) !== OK) {
            return Settings.TREE_FAILURE;
        }

        if (this.target.hits === this.target.hitsMax) {
            return Settings.TREE_SUCCESS;
        }

        return Settings.TREE_RUNNING;
    }
}
