import {Tree_Core_Action} from "../Tree/Core/Action";
import {Tree_Core_Tick} from "../Tree/Core/Tick";
import {TREE_SUCCESS, TREE_FAILURE} from "../Constants";

export class Check_CreepCarriesEnergy extends Tree_Core_Action {

    public tick(tick: Tree_Core_Tick): number {
        const creep = tick.target as Creep;

        if (creep.store.getUsedCapacity(RESOURCE_ENERGY) > 0) {
            return TREE_SUCCESS;
        }

        return TREE_FAILURE;
    }

    public getDescription(tick: Tree_Core_Tick): string {
        const creep = tick.target as Creep;

        return "I am carrying energy (" + creep.store.getUsedCapacity(RESOURCE_ENERGY) + ").";
    }
}
