import {Role_Role} from "./Role";
import {StateMachine_State} from "../StateMachine/State";
import {Util_Logger} from "../Util/Logger";
import {StateMachine_Scout_Wait} from "../StateMachine/Scout/Wait";
import {StateMachine_Scout_ChangeRoom} from "../StateMachine/Scout/ChangeRoom";
import {StateMachine_Scout_SignController} from "../StateMachine/Scout/SignController";

/**
 * Moves from room to room and updates room informations in the memory.
 */
export class Role_Scout extends Role_Role {
    public static role(): string {
        return "Scout";
    }
    public createState(state: string): StateMachine_State {
        switch (state) {
            case "Wait":
                return new StateMachine_Scout_Wait();

            case "ChangeRoom":
                return new StateMachine_Scout_ChangeRoom();

            case "SignController":
                return new StateMachine_Scout_SignController();

            default:
                Util_Logger.error("Could not create state class for illegal state in Scout: '" + state + "'.");
                throw new Error();
        }
    }
}
