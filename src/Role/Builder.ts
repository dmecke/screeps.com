import { StateMachine_Builder_Build } from "../StateMachine/Builder/Build";
import { StateMachine_Builder_Load } from "../StateMachine/Builder/Load";
import { StateMachine_Builder_Pickup } from "../StateMachine/Builder/Pickup";
import { StateMachine_Builder_Repair } from "../StateMachine/Builder/Repair";
import { StateMachine_Builder_UpgradeController } from "../StateMachine/Builder/UpgradeController";
import { StateMachine_Builder_Wait } from "../StateMachine/Builder/Wait";
import { StateMachine_State } from "../StateMachine/State";
import { Util_Logger } from "../Util/Logger";
import { Role_Role } from "./Role";

/**
 * repairs and builds structures; helps with upgrading when nothing to do
 */
export class Role_Builder extends Role_Role {
    public static role(): string {
        return "Builder";
    }
    public createState(state: string): StateMachine_State {
        switch (state) {
            case "Wait":
                return new StateMachine_Builder_Wait();

            case "Build":
                return new StateMachine_Builder_Build();

            case "Repair":
                return new StateMachine_Builder_Repair();

            case "Load":
                return new StateMachine_Builder_Load();

            case "UpgradeController":
                return new StateMachine_Builder_UpgradeController();

            case "Pickup":
                return new StateMachine_Builder_Pickup();

            default:
                Util_Logger.error("Could not create state class for illegal state in Builder: '" + state + "'.");
                throw new Error();
        }
    }
}
