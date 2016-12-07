import {Tree_Core_Action} from "../Tree/Core/Action";
import {Settings} from "../Settings";
import {Tree_Core_Tick} from "../Tree/Core/Tick";

export class Action_WithdrawFromTarget extends Tree_Core_Action {

    private resource: string;

    public constructor(resource: string) {
        super();
        this.resource = resource;
    }

    public tick(tick: Tree_Core_Tick): number {
        let creep = tick.target as Creep;
        let target = tick.blackboard.get("target", tick.tree.id) as StructureStorage|StructureContainer;

        if (target === undefined) {
            return Settings.TREE_FAILURE;
        }

        if (creep.withdraw(target, this.resource) === OK) {
            return Settings.TREE_SUCCESS;
        }

        return Settings.TREE_FAILURE;
    }
}
