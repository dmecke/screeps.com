import {Tree_Core_Action} from "../Tree/Core/Action";
import {Settings} from "../Settings";
import {Tree_Core_Tick} from "../Tree/Core/Tick";

export class Action_BuildTarget extends Tree_Core_Action {

    public tick(tick: Tree_Core_Tick): number {
        let creep = tick.target as Creep;
        let constructionSite = tick.blackboard.get("target", tick.tree.id) as ConstructionSite;

        if (creep.build(constructionSite) !== OK) {
            return Settings.TREE_FAILURE;
        }

        return Settings.TREE_RUNNING;
    }
}
