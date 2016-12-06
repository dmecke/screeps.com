import {Tree_Core_Action} from "../Tree/Core/Action";
import {Settings} from "../Settings";

export class Action_ClaimController extends Tree_Core_Action {

    private creep: Creep;

    public constructor(creep: Creep) {
        super();
        this.creep = creep;
    }

    public tick(): number {
        let room = this.creep.room;

        if (!room.hasController()) {
            return Settings.TREE_FAILURE;
        }

        if (this.creep.claimController(room.controller) === OK) {
            return Settings.TREE_SUCCESS;
        }

        return Settings.TREE_FAILURE;
    }
}
