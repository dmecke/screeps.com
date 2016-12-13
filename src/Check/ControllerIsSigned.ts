import {Tree_Core_Action} from "../Tree/Core/Action";
import {Tree_Core_Tick} from "../Tree/Core/Tick";
import {TREE_FAILURE, TREE_SUCCESS} from "../Constants";

export class Check_ControllerIsSigned extends Tree_Core_Action {

    private message: string;

    public constructor(message) {
        super();
        this.message = message;
    }

    public tick(tick: Tree_Core_Tick): number {
        let creep = tick.target as Creep;
        let controller = creep.room.controller;

        if (controller === undefined) {
            return TREE_FAILURE;
        }

        if (this.message === "" && controller.sign === undefined) {
            return TREE_SUCCESS;
        }

        if (controller.sign && controller.sign.username === creep.owner.username && controller.sign.text === this.message) {
            return TREE_SUCCESS;
        }

        return TREE_FAILURE;
    }
}
