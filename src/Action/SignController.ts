import {Tree_Core_Action} from "../Tree/Core/Action";
import {Tree_Core_Tick} from "../Tree/Core/Tick";
import {TREE_FAILURE, TREE_SUCCESS} from "../Constants";

export class Action_SignController extends Tree_Core_Action {

    private readonly message: string;

    public constructor(message: string) {
        super();
        this.message = message;
    }

    public tick(tick: Tree_Core_Tick): number {
        const creep = tick.target as Creep;
        const room = creep.room;

        if (!room.hasController()) {
            return TREE_FAILURE;
        }

        if (creep.signController(room.controller, this.message) === OK) {
            return TREE_SUCCESS;
        }

        return TREE_FAILURE;
    }

    public getDescription(tick: Tree_Core_Tick): string {
        return "I try to sign the controller with '" + this.message + "'.";
    }
}
