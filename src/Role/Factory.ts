import {Settings} from "../Settings";
import {Util_Logger} from "../Util/Logger";
import {Role_Harvester} from "./Harvester";
import {Role_Builder} from "./Builder";
import {Role_Wallie} from "./Wallie";
import {Role_Upgrader} from "./Upgrader";
import {Role_Transporter} from "./Transporter";
import {Role_SpawnSupplier} from "./SpawnSupplier";
import {Role_Defender} from "./Defender";
import {Role_Scout} from "./Scout";
import {Role_Claimer} from "./Claimer";
import {ROLE_CLAIMER, ROLE_SCOUT, ROLE_DEFENDER, ROLE_WALLIE, ROLE_SPAWN_SUPPLIER, ROLE_TRANSPORTER, ROLE_HARVESTER, ROLE_BUILDER, ROLE_UPGRADER} from "../Constants";

export class Role_Factory {

    public static minimumCreepCount(role: string) {
        switch (role) {
            case ROLE_HARVESTER:
                return Settings.NUMBER_OF_HARVESTER;

            case ROLE_BUILDER:
                return Settings.NUMBER_OF_BUILDER;

            case ROLE_UPGRADER:
                return Settings.NUMBER_OF_UPGRADER;

            case ROLE_TRANSPORTER:
                return Settings.NUMBER_OF_TRANSPORTER;

            case ROLE_SPAWN_SUPPLIER:
                return Settings.NUMBER_OF_SPAWN_SUPPLIER;

            case ROLE_WALLIE:
                return Settings.NUMBER_OF_WALLIE;

            case ROLE_DEFENDER:
                return Settings.NUMBER_OF_DEFENDER;

            case ROLE_SCOUT:
                return Settings.NUMBER_OF_SCOUT;

            case ROLE_CLAIMER:
                return Settings.NUMBER_OF_CLAIMER;

            default:
                Util_Logger.error("Cannot find minimum creep count for illegal name '" + role + "'");
                throw new Error();
        }
    }

    public static isRoomIndependant(role: string) {
        switch (role) {
            case ROLE_SCOUT:
            case ROLE_CLAIMER:
            case ROLE_TRANSPORTER:
                return true;

            default:
                return false;
        }
    }

    public static roles(): string[] {
        return [
            ROLE_CLAIMER,
            ROLE_SCOUT,
            ROLE_DEFENDER,
            ROLE_WALLIE,
            ROLE_BUILDER,
            ROLE_UPGRADER,
            ROLE_TRANSPORTER,
            ROLE_SPAWN_SUPPLIER,
            ROLE_HARVESTER,
        ];
    }

    public static bodyParts(role: string, spawn: StructureSpawn): BodyPartConstant[] {
        const energyCapacityAvailable = spawn.room.energyCapacityAvailable;
        const energyAvailable = spawn.room.energyAvailable;

        switch (role) {
            case ROLE_HARVESTER:
                const energy = spawn.room.creepsOfRole(ROLE_HARVESTER).length > 0 ? energyCapacityAvailable : energyAvailable;

                return Role_Harvester.bodyParts(energy);

            case ROLE_BUILDER:
                return Role_Builder.bodyParts(energyCapacityAvailable);

            case ROLE_WALLIE:
                return Role_Wallie.bodyParts(energyCapacityAvailable);

            case ROLE_UPGRADER:
                return Role_Upgrader.bodyParts(energyCapacityAvailable);

            case ROLE_TRANSPORTER:
                return Role_Transporter.bodyParts(energyCapacityAvailable);

            case ROLE_SPAWN_SUPPLIER:
                return Role_SpawnSupplier.bodyParts(energyCapacityAvailable);

            case ROLE_DEFENDER:
                return Role_Defender.bodyParts(energyCapacityAvailable);

            case ROLE_SCOUT:
                return Role_Scout.bodyParts(energyCapacityAvailable);

            case ROLE_CLAIMER:
                return Role_Claimer.bodyParts(energyCapacityAvailable);

            default:
                Util_Logger.error("Cannot detect body parts. Illegal name '" + role + "'");
                throw new Error();
        }
    }
}
