import { StateMachine_State } from "../StateMachine/State";
import { StateMachine_Transporter_FillStorage } from "../StateMachine/Transporter/FillStorage";
import { StateMachine_Transporter_Pickup } from "../StateMachine/Transporter/Pickup";
import { StateMachine_Transporter_TransferEnergy } from "../StateMachine/Transporter/TransferEnergy";
import { StateMachine_Transporter_Wait } from "../StateMachine/Transporter/Wait";
import { Util_Logger } from "../Util/Logger";
import { Role_Role } from "./Role";

/**
 * transports harvested energy to containers
 */
export class Role_Transporter extends Role_Role {
    public static role(): string {
        return "Transporter";
    }
    public createState(state: string): StateMachine_State {
        switch (state) {
            case "Wait":
                return new StateMachine_Transporter_Wait();

            case "FillStorage":
                return new StateMachine_Transporter_FillStorage();

            case "Pickup":
                return new StateMachine_Transporter_Pickup();

            case "TransferEnergy":
                return new StateMachine_Transporter_TransferEnergy();

            default:
                Util_Logger.error("Could not create state class for illegal state in Transporter: '" + state + "'");
                throw new Error();
        }
    }
}
