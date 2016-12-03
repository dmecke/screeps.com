import {Tree_Core_Action} from "../Core/Action";
import {Settings} from "../../Settings";

export class Tree_Action_Harvest extends Tree_Core_Action {
    private creep: Creep;
    private source: Source;
    public constructor(creep: Creep, source: Source) {
        super();
        this.creep = creep;
        this.source = source;
    }
    public tick(): number {
        if (this.creep.harvest(this.source) === OK) {
            if (this.source.energy === 0) {
                return Settings.TREE_SUCCESS;
            } else {
                return Settings.TREE_RUNNING;
            }
        } else {
            return Settings.TREE_FAILURE;
        }
    }
}
