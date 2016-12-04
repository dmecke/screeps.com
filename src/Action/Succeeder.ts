import {Tree_Core_Action} from "../Tree/Core/Action";
import {Settings} from "../Settings";

export class Action_Succeeder extends Tree_Core_Action {

    public tick(): number {
        return Settings.TREE_SUCCESS;
    }
}
