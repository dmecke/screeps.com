import {Tree_Core_Action} from "../Tree/Core/Action";
import {Settings} from "../Settings";
import {Tree_Core_Tick} from "../Tree/Core/Tick";

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
            return Settings.TREE_FAILURE;
        }

        if (this.message === "" && controller.sign === undefined) {
            return Settings.TREE_SUCCESS;
        }

        if (controller.sign && controller.sign.username === creep.owner.username && controller.sign.text === this.message) {
            return Settings.TREE_SUCCESS;
        }

        return Settings.TREE_FAILURE;
    }
}
