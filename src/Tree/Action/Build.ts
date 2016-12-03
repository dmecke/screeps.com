import {Tree_Core_Action} from "../Core/Action";
import {Settings} from "../../Settings";

export class Tree_Action_Build extends Tree_Core_Action {

    private creep: Creep;

    private target: ConstructionSite;

    public constructor(creep: Creep, target: ConstructionSite) {
        super();
        this.creep = creep;
        this.target = target;
    }

    public tick(): number {
        if (this.creep.build(this.target) !== OK) {
            return Settings.TREE_FAILURE;
        }

        return Settings.TREE_RUNNING;
    }
}
