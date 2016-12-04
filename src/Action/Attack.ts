import {Tree_Core_Action} from "../Tree/Core/Action";
import {Settings} from "../Settings";

export class Action_Attack extends Tree_Core_Action {

    private creep: Creep;

    private target: Creep|Structure;

    public constructor(creep: Creep, target: Creep|Structure) {
        super();
        this.creep = creep;
        this.target = target;
    }

    public tick(): number {
        if (this.creep.attack(this.target) !== OK) {
            return Settings.TREE_FAILURE;
        }

        if (this.target.hits === 0) {
            return Settings.TREE_SUCCESS;
        }

        return Settings.TREE_RUNNING;
    }
}
