import {Tree_Core_Action} from "../Tree/Core/Action";
import {Tree_Core_Tick} from "../Tree/Core/Tick";
import {TREE_FAILURE, TREE_SUCCESS} from "../Constants";

export class Check_ControllerIsNotSigned extends Tree_Core_Action {

    private readonly message: string;

    public constructor(message) {
        super();
        this.message = message;
    }

    public tick(tick: Tree_Core_Tick): number {
        const creep = tick.target as Creep;
        const controller = creep.room.controller;

        if (controller === undefined) {
            return TREE_SUCCESS;
        }

        if (this.message === "" && controller.sign === undefined) {
            return TREE_FAILURE;
        }

        if (controller.sign) {
            if (controller.sign.username !== creep.owner.username || controller.sign.text !== this.message) {
                return TREE_SUCCESS;
            }
        }

        return TREE_FAILURE;
    }

    public getDescription(tick: Tree_Core_Tick): string {
        const creep = tick.target as Creep;
        const room = creep.room;

        return "The controller in " + room.name + " is not signed with our message '" + this.message + "'.";
    }
}
