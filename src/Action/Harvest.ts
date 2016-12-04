import {Tree_Core_Action} from "../Tree/Core/Action";
import {Settings} from "../Settings";

export class Action_Harvest extends Tree_Core_Action {

    private creep: Creep;

    private source: Source;

    public constructor(creep: Creep, source: Source) {
        super();
        this.creep = creep;
        this.source = source;
    }

    public tick(): number {
        if (this.creep.harvest(this.source) !== OK) {
            return Settings.TREE_FAILURE;
        }

        if (this.source.energy === 0) {
            return Settings.TREE_SUCCESS;
        }

        return Settings.TREE_RUNNING;
    }
}
