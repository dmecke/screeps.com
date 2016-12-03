import {Tree_Core_Action} from "../Core/Action";
import {Settings} from "../../Settings";

export class Tree_Action_Succeeder extends Tree_Core_Action {
    public tick(): number {
        console.log("Succeeder: <span style='color: #8bc5ff'>" + Settings.TREE_SUCCESS + "</span>");
        return Settings.TREE_SUCCESS;
    }
}
