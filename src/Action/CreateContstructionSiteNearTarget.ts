import {Tree_Core_Action} from "../Tree/Core/Action";
import {Settings} from "../Settings";
import {Tree_Core_Tick} from "../Tree/Core/Tick";

export class Action_CreateConstructionSiteNearTarget extends Tree_Core_Action {

    private structureType: string;

    private range: number;

    public constructor(structureType: string, range: number) {
        super();
        this.structureType = structureType;
        this.range = range;
    }

    public tick(tick: Tree_Core_Tick): number {
        let target = tick.blackboard.get("target", tick.tree.id) as { pos: RoomPosition };
        let status = target.pos.createCloseContainerConstructionSite();

        if (status === OK) {
            return Settings.TREE_SUCCESS;
        }

        return Settings.TREE_FAILURE;
    }
}
