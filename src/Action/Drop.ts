import {Tree_Core_Action} from "../Tree/Core/Action";
import {TREE_SUCCESS, TREE_FAILURE} from "../Constants";

export class Action_Drop extends Tree_Core_Action {

    private creep: Creep;

    private readonly resource: ResourceConstant;

    public constructor(creep: Creep, resource: ResourceConstant) {
        super();
        this.creep = creep;
        this.resource = resource;
    }

    public tick(): number {
        if (this.creep.drop(this.resource) === OK) {
            return TREE_SUCCESS;
        }

        return TREE_FAILURE;
    }
}
