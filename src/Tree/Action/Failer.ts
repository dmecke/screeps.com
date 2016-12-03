import {Tree_Core_Action} from "../Core/Action";
import {Settings} from "../../Settings";

export class Tree_Action_Failer extends Tree_Core_Action {
    public tick(): number {
        console.log("Failer: <span style='color: #8bc5ff'>" + Settings.TREE_FAILURE + "</span>");
        return Settings.TREE_FAILURE;
    }
}
