import {Tree_Core_Action} from "../Core/Action";
import {Settings} from "../../Settings";

export class Tree_Action_PickUp extends Tree_Core_Action {

    private creep: Creep;

    private target: Resource;

    public constructor(creep: Creep, target: Resource) {
        super();
        this.creep = creep;
        this.target = target;
    }

    public tick(): number {
        if (this.creep.pickup(this.target) === OK) {
            return Settings.TREE_SUCCESS;
        }

        return Settings.TREE_FAILURE;
    }
}
