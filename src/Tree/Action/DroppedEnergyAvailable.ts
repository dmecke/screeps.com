import {Tree_Core_Action} from "../Core/Action";
import {Tree_Tree} from "../Tree_Tree";

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
            return Tree_Tree.FAILURE;
        }

        if (this.range === null) {
            return Tree_Tree.SUCCESS;
        }

        if (this.creep.pos.inRangeTo(droppedResources[0].pos, this.range)) {
            return Tree_Tree.SUCCESS;
        }

        return Tree_Tree.FAILURE;
    }
}
