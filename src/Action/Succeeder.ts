import {Tree_Core_Action} from "../Tree/Core/Action";
import {TREE_SUCCESS} from "../Constants";

export class Action_Succeeder extends Tree_Core_Action {

    public tick(): number {
        return TREE_SUCCESS;
    }
}
