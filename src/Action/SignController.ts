import {Tree_Core_Action} from "../Tree/Core/Action";
import {Settings} from "../Settings";
import {Tree_Core_Tick} from "../Tree/Core/Tick";

export class Action_SignController extends Tree_Core_Action {

    private message: string;

    public constructor(message: string) {
        super();
        this.message = message;
    }

    public tick(tick: Tree_Core_Tick): number {
        let creep = tick.target as Creep;
        let room = creep.room;

        if (!room.hasController()) {
            return Settings.TREE_FAILURE;
        }

        if (creep.signController(room.controller, this.message) === OK) {
            return Settings.TREE_SUCCESS;
        }

        return Settings.TREE_FAILURE;
    }
}
