import {Tree_Core_Action} from "../Tree/Core/Action";
import {Tree_Core_Tick} from "../Tree/Core/Tick";
import {TREE_SUCCESS, TREE_FAILURE} from "../Constants";

export class Action_CreateConstructionSiteNearTarget extends Tree_Core_Action {

    private structureType: string;

    private range: number;

    public constructor(structureType: string, range: number) {
        super();
        this.structureType = structureType;
        this.range = range;
    }

    public tick(tick: Tree_Core_Tick): number {
        const target = tick.blackboard.get("target", tick.tree.id) as { pos: RoomPosition };
        const status = target.pos.createCloseContainerConstructionSite();

        if (status === OK) {
            return TREE_SUCCESS;
        }

        return TREE_FAILURE;
    }
}
