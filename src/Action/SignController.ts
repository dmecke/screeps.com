import {Tree_Core_Action} from "../Tree/Core/Action";
import {Settings} from "../Settings";

export class Action_SignController extends Tree_Core_Action {

    private creep: Creep;

    private message: string;

    public constructor(creep: Creep, message: string) {
        super();
        this.creep = creep;
        this.message = message;
    }

    public tick(): number {
        let room = this.creep.room;

        if (!room.hasController()) {
            return Settings.TREE_FAILURE;
        }

        if (this.creep.signController(room.controller, this.message) === OK) {
            return Settings.TREE_SUCCESS;
        }

        return Settings.TREE_FAILURE;
    }
}
