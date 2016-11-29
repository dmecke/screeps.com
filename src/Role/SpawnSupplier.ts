import { StateMachine_SpawnSupplier_Load } from "../StateMachine/SpawnSupplier/Load";
import { StateMachine_SpawnSupplier_Pickup } from "../StateMachine/SpawnSupplier/Pickup";
import { StateMachine_SpawnSupplier_TransferEnergy } from "../StateMachine/SpawnSupplier/TransferEnergy";
import { StateMachine_SpawnSupplier_UpgradeController } from "../StateMachine/SpawnSupplier/UpgradeController";
import { StateMachine_SpawnSupplier_Wait } from "../StateMachine/SpawnSupplier/Wait";
import { StateMachine_State } from "../StateMachine/State";
import { Util_Logger } from "../Util/Logger";
import { Role_Role } from "./Role";

/**
 * supplys spawn points and extensions with energy
 */
export class Role_SpawnSupplier extends Role_Role {
    public static role(): string {
        return "SpawnSupplier";
    }
    public createState(state: string): StateMachine_State {
        switch (state) {
            case "Wait":
                return new StateMachine_SpawnSupplier_Wait();

            case "Pickup":
                return new StateMachine_SpawnSupplier_Pickup();

            case "Load":
                return new StateMachine_SpawnSupplier_Load();

            case "TransferEnergy":
                return new StateMachine_SpawnSupplier_TransferEnergy();

            case "UpgradeController":
                return new StateMachine_SpawnSupplier_UpgradeController();

            default:
                Util_Logger.error("Could not create state class for illegal state in SpawnSupplier: '" + state + "'");
                throw new Error();
        }
    }
}
