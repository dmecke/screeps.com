import {Tree_Core_Action} from "../Tree/Core/Action";
import {Settings} from "../Settings";
import {Tree_Core_Tick} from "../Tree/Core/Tick";

export class Action_HarvestTarget extends Tree_Core_Action {

    public tick(tick: Tree_Core_Tick): number {
        let creep = tick.target as Creep;
        let source = tick.blackboard.get("target", tick.tree.id) as Source;

        if (source === undefined) {
            return Settings.TREE_FAILURE;
        }

        let status = creep.harvest(source);
        if (status !== OK) {
            return Settings.TREE_FAILURE;
        }

        if (source.energy === 0) {
            return Settings.TREE_SUCCESS;
        }

        return Settings.TREE_RUNNING;
    }
}
