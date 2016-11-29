import { StateMachine_State } from "../StateMachine/State";
import { StateMachine_Wallie_Load } from "../StateMachine/Wallie/Load";
import { StateMachine_Wallie_Pickup } from "../StateMachine/Wallie/Pickup";
import { StateMachine_Wallie_Repair } from "../StateMachine/Wallie/Repair";
import { StateMachine_Wallie_UpgradeController } from "../StateMachine/Wallie/UpgradeController";
import { StateMachine_Wallie_Wait } from "../StateMachine/Wallie/Wait";
import { Util_Logger } from "../Util/Logger";
import { Role_Role } from "./Role";

/**
 * repairs walls and ramparts
 */
export class Role_Wallie extends Role_Role {
    public static role(): string {
        return "Wallie";
    }
    public createState(state: string): StateMachine_State {
        switch (state) {
            case "Wait":
                return new StateMachine_Wallie_Wait();

            case "Pickup":
                return new StateMachine_Wallie_Pickup();

            case "Load":
                return new StateMachine_Wallie_Load();

            case "Repair":
                return new StateMachine_Wallie_Repair();

            case "UpgradeController":
                return new StateMachine_Wallie_UpgradeController();

            default:
                Util_Logger.error("Could not create state class for illegal state in Builder: '" + state + "'");
                throw new Error();
        }
    }
}
