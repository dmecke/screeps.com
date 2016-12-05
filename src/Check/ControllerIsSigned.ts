import {Tree_Core_Action} from "../Tree/Core/Action";
import {Settings} from "../Settings";

export class Check_ControllerIsSigned extends Tree_Core_Action {

    private creep: Creep;

    private message: string;

    public constructor(creep: Creep, message) {
        super();
        this.creep = creep;
        this.message = message;
    }

    public tick(): number {
        let controller = this.creep.room.controller;

        if (controller === undefined) {
            return Settings.TREE_FAILURE;
        }

        if (this.message === "" && controller.sign === undefined) {
            return Settings.TREE_SUCCESS;
        }

        if (controller.sign && controller.sign.username === this.creep.owner.username && controller.sign.text === this.message) {
            return Settings.TREE_SUCCESS;
        }

        return Settings.TREE_FAILURE;
    }
}
