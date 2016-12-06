import {Tree_Core_Action} from "../Tree/Core/Action";
import {Settings} from "../Settings";
import {Tree_Core_Tick} from "../Tree/Core/Tick";

export class Check_HasEnergy extends Tree_Core_Action {

    public tick(tick: Tree_Core_Tick): number {
        let tower = tick.target as StructureTower;

        if (tower.energy > 0) {
            return Settings.TREE_SUCCESS;
        }

        return Settings.TREE_FAILURE;
    }
}
