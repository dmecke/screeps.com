import {Tree_Core_Action} from "../Tree/Core/Action";
import {Tree_Core_Tick} from "../Tree/Core/Tick";
import {TREE_SUCCESS, TREE_FAILURE} from "../Constants";

export class Action_TransferToTarget extends Tree_Core_Action {

    private readonly resource: ResourceConstant;

    public constructor(resource: ResourceConstant) {
        super();
        this.resource = resource;
    }

    public tick(tick: Tree_Core_Tick): number {
        const creep = tick.target as Creep;
        const target = tick.blackboard.get("target", tick.tree.id) as Creep|StructureSpawn|Structure;

        if (creep.transfer(target, this.resource) === OK) {
            return TREE_SUCCESS;
        }

        return TREE_FAILURE;
    }
}
