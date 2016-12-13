import {Tree_Core_Action} from "../Tree/Core/Action";
import {TREE_RUNNING} from "../Constants";

export class Action_Runner extends Tree_Core_Action {

    public tick(): number {
        return TREE_RUNNING;
    }
}
