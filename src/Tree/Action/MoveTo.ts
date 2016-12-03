import {Tree_Core_Action} from "../Core/Action";
import {Settings} from "../../Settings";

export class Tree_Action_MoveTo extends Tree_Core_Action {

    private creep: Creep;

    private target: RoomPosition|{ pos: RoomPosition };

    public constructor(creep: Creep, target: RoomPosition|{ pos: RoomPosition }) {
        super();
        this.creep = creep;
        this.target = target;
    }

    public tick(): number {
        if (this.creep.moveTo(this.target) !== OK) {
            return Settings.TREE_FAILURE;
        }

        if (this.creep.pos.isEqualTo(this.target)) {
            return Settings.TREE_SUCCESS;
        }

        return Settings.TREE_RUNNING;
    }
}
