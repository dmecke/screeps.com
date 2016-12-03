import {Tree_Core_Action} from "../Core/Action";
import {Settings} from "../../Settings";

export class Tree_Action_DroppedEnergyAvailable extends Tree_Core_Action {

    private creep: Creep;

    private range: number;

    public constructor(creep: Creep, range?: number) {
        super();
        this.creep = creep;
        this.range = range;
    }

    public tick(): number {
        let room = this.creep.room;
        let droppedResources = room.findNearestDroppedEnergy(this.creep);

        if (droppedResources.length === 0) {
            return Settings.TREE_FAILURE;
        }

        if (!this.range) {
            return Settings.TREE_SUCCESS;
        }

        if (this.creep.pos.inRangeTo(droppedResources[0].pos, this.range)) {
            return Settings.TREE_SUCCESS;
        }

        return Settings.TREE_FAILURE;
    }
}
