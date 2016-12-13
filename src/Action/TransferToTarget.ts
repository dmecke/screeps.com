import {Tree_Core_Action} from "../Tree/Core/Action";
import {Tree_Core_Tick} from "../Tree/Core/Tick";
import {TREE_SUCCESS, TREE_FAILURE} from "../Constants";

export class Action_TransferToTarget extends Tree_Core_Action {

    private resource: string;

    public constructor(resource: string) {
        super();
        this.resource = resource;
    }

    public tick(tick: Tree_Core_Tick): number {
        let creep = tick.target as Creep;
        let target = tick.blackboard.get("target", tick.tree.id) as Creep|Spawn|Structure;

        if (creep.transfer(target, this.resource) === OK) {
            return TREE_SUCCESS;
        }

        return TREE_FAILURE;
    }
}
