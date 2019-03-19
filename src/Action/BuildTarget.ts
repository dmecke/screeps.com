import {Tree_Core_Action} from "../Tree/Core/Action";
import {Tree_Core_Tick} from "../Tree/Core/Tick";
import {TREE_FAILURE, TREE_RUNNING} from "../Constants";

export class Action_BuildTarget extends Tree_Core_Action {

    public tick(tick: Tree_Core_Tick): number {
        const creep = tick.target as Creep;
        const constructionSite = tick.blackboard.get("target", tick.tree.id) as ConstructionSite;

        if (creep.build(constructionSite) !== OK) {
            return TREE_FAILURE;
        }

        return TREE_RUNNING;
    }
}
