import {StateMachine_Defender_Attack} from "../StateMachine/Defender/Attack";
import {StateMachine_Defender_Wait} from "../StateMachine/Defender/Wait";
import {StateMachine_State} from "../StateMachine/State";
import {Util_Logger} from "../Util/Logger";
import {Role_Role} from "./Role";

/**
 * repairs and builds structures; helps with upgrading when nothing to do
 */
export class Role_Defender extends Role_Role {
    public static role(): string {
        return "Defender";
    }
    public createState(state: string): StateMachine_State {
        switch (state) {
            case "Wait":
                return new StateMachine_Defender_Wait();

            case "Attack":
                return new StateMachine_Defender_Attack();

            default:
                Util_Logger.error("Could not create state class for illegal state in Defender: '" + state + "'.");
                throw new Error();
        }
    }
}
