import { StateMachine_Harvester_DropEnergy } from "../StateMachine/Harvester/DropEnergy";
import { StateMachine_Harvester_Harvest } from "../StateMachine/Harvester/Harvest";
import { StateMachine_Harvester_TransferEnergy } from "../StateMachine/Harvester/TransferEnergy";
import { StateMachine_Harvester_Wait } from "../StateMachine/Harvester/Wait";
import { StateMachine_State } from "../StateMachine/State";
import { Util_Logger } from "../Util/Logger";
import { Role_Role } from "./Role";

/**
 * harvests energy
 */
export class Role_Harvester extends Role_Role {
    public static role(): string {
        return "Harvester";
    }
    public createState(state: string): StateMachine_State {
        switch (state) {
            case "Wait":
                return new StateMachine_Harvester_Wait();

            case "DropEnergy":
                return new StateMachine_Harvester_DropEnergy();

            case "Harvest":
                return new StateMachine_Harvester_Harvest();

            case "TransferEnergy":
                return new StateMachine_Harvester_TransferEnergy();

            default:
                Util_Logger.error("Could not create state class for illegal state in Harvester: '" + state + "'");
                throw new Error();
        }
    }
}
