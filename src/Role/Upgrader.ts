import { StateMachine_State } from "../StateMachine/State";
import { StateMachine_Upgrader_Load } from "../StateMachine/Upgrader/Load";
import { StateMachine_Upgrader_Pickup } from "../StateMachine/Upgrader/Pickup";
import { StateMachine_Upgrader_UpgradeController } from "../StateMachine/Upgrader/UpgradeController";
import { StateMachine_Upgrader_Wait } from "../StateMachine/Upgrader/Wait";
import { Util_Logger } from "../Util/Logger";
import { Role_Role } from "./Role";

/**
 * upgrades the controller
 */
export class Role_Upgrader extends Role_Role {
    public static role(): string {
        return "Upgrader";
    }
    public createState(state: string): StateMachine_State {
        switch (state) {
            case "Wait":
                return new StateMachine_Upgrader_Wait();

            case "Pickup":
                return new StateMachine_Upgrader_Pickup();

            case "Load":
                return new StateMachine_Upgrader_Load();

            case "UpgradeController":
                return new StateMachine_Upgrader_UpgradeController();

            default:
                Util_Logger.error("Could not create state class for illegal state in Upgrader: '" + state + "'");
                throw new Error();
        }
    }
}
