import {Role_Harvester} from "../Role/Harvester";
import {Util_Logger} from "../Util/Logger";
import {Task_Task} from "./Task";
import {Settings} from "../Settings";
import {Role_Role} from "../Role/Role";
import {Role_Builder} from "../Role/Builder";
import {Role_Wallie} from "../Role/Wallie";
import {Role_Upgrader} from "../Role/Upgrader";
import {Role_Transporter} from "../Role/Transporter";
import {Role_SpawnSupplier} from "../Role/SpawnSupplier";
import {Role_Defender} from "../Role/Defender";
import {Role_Scout} from "../Role/Scout";

export class Task_Spawn extends Task_Task {
    public static NUMBER_OF_HARVESTER = 4;
    public static NUMBER_OF_UPGRADER = 1;
    public static NUMBER_OF_TRANSPORTER = 0; // 4; currently not needed as all creeps take the energy directly from the containers near the sources
    public static NUMBER_OF_SPAWN_SUPPLIER = 3;
    public static NUMBER_OF_WALLIE = 1;
    public static NUMBER_OF_DEFENDER = 1;
    public static NUMBER_OF_SCOUT = 1;
    public static NUMBER_OF_BUILDER = 1;
    public static BUILDER_MAXIMUM = 5;

    private static minimumCreepCount(role: string) {
        switch (role) {
            case Settings.ROLE_HARVESTER:
                return Task_Spawn.NUMBER_OF_HARVESTER;

            case Settings.ROLE_BUILDER:
                return Task_Spawn.NUMBER_OF_BUILDER;

            case Settings.ROLE_UPGRADER:
                return Task_Spawn.NUMBER_OF_UPGRADER;

            case Settings.ROLE_TRANSPORTER:
                return Task_Spawn.NUMBER_OF_TRANSPORTER;

            case Settings.ROLE_SPAWN_SUPPLIER:
                return Task_Spawn.NUMBER_OF_SPAWN_SUPPLIER;

            case Settings.ROLE_WALLIE:
                return Task_Spawn.NUMBER_OF_WALLIE;

            case Settings.ROLE_DEFENDER:
                return Task_Spawn.NUMBER_OF_DEFENDER;

            case Settings.ROLE_SCOUT:
                return Task_Spawn.NUMBER_OF_SCOUT;

            default:
                Util_Logger.error("Cannot find minimum creep count for illegal name '" + role + "'");
                throw new Error();
        }
    }

    private static roles(): string[] {
        return [
            Settings.ROLE_SCOUT,
            Settings.ROLE_DEFENDER,
            Settings.ROLE_WALLIE,
            Settings.ROLE_BUILDER,
            Settings.ROLE_UPGRADER,
            Settings.ROLE_TRANSPORTER,
            Settings.ROLE_SPAWN_SUPPLIER,
            Settings.ROLE_HARVESTER,
        ];
    }

    private static bodyParts(role: string, spawn: StructureSpawn) {
        let energyCapacityAvailable = spawn.room.energyCapacityAvailable;
        switch (role) {
            case Settings.ROLE_HARVESTER:
                return Role_Harvester.bodyParts(energyCapacityAvailable);

            case Settings.ROLE_BUILDER:
                return Role_Builder.bodyParts(energyCapacityAvailable);

            case Settings.ROLE_WALLIE:
                return Role_Wallie.bodyParts(energyCapacityAvailable);

            case Settings.ROLE_UPGRADER:
                return Role_Upgrader.bodyParts(energyCapacityAvailable);

            case Settings.ROLE_TRANSPORTER:
                return Role_Transporter.bodyParts(energyCapacityAvailable);

            case Settings.ROLE_SPAWN_SUPPLIER:
                return Role_SpawnSupplier.bodyParts(energyCapacityAvailable);

            case Settings.ROLE_DEFENDER:
                return Role_Defender.bodyParts(energyCapacityAvailable);

            case Settings.ROLE_SCOUT:
                return Role_Scout.bodyParts(energyCapacityAvailable);

            default:
                Util_Logger.error("Cannot detect body parts. Illegal name '" + role + "'");
                throw new Error();
        }
    }

    public execute() {
        let spawnName = "Spawn1";
        let spawned = false;
        for (let role of Task_Spawn.roles()) {
            if (this.creepsOfRole(role).length < Task_Spawn.minimumCreepCount(role)) {
                this.spawn(role, spawnName);
                spawned = true;
            }
        }
        if (!spawned && this.creepsOfRole(Settings.ROLE_BUILDER).length < Task_Spawn.BUILDER_MAXIMUM) {
            this.spawn(Settings.ROLE_BUILDER, spawnName);
        }
        this.logStatistics();
    }

    private logStatistics(): void {
        let message: string[] = [];
        for (let role of Task_Spawn.roles()) {
            message.push(this.creepsOfRole(role).length + " " + role);
        }
        Util_Logger.info("There are " + message.join(", ") + " in this room.");
    }

    private spawn(role: string, spawnName: string) {
        let spawn = Game.spawns[spawnName];
        let newName = spawn.createCreep(Task_Spawn.bodyParts(role, spawn), undefined, {
            blackboard: {},
            debug: false,
            experimental: false,
            home_room: spawn.room.name,
            role,
            target_room: spawn.room.name,
        });
        if (!Number(newName)) {
            let creep = Game.creeps[newName];
            let r = creep.role() as Role_Role;
            let roleName = r.name();
            if (roleName === Settings.ROLE_SCOUT) {
                creep.notifyWhenAttacked(false);
            }
            Util_Logger.info("Spawning new " + roleName + ": " + newName + ".");
        } else if (this.creepsOfRole(role).length < Task_Spawn.minimumCreepCount(role)) {
            if (newName === ERR_NOT_ENOUGH_ENERGY) {
                Util_Logger.warn("Not enough energy to spawn new " + role + ". There are only " + this.creepsOfRole(role).length + ", but there should be at least " + Task_Spawn.minimumCreepCount(role) + ".");
            } else if (newName === ERR_BUSY) {
                Util_Logger.warn("Cannot spawn " + role + ", already busy spawning another creep. There are only " + this.creepsOfRole(role).length + ", but there should be at least " + Task_Spawn.minimumCreepCount(role) + ".");
            }
        }
    }

    private creepsOfRole(roleName: string): Creep[] {
        return _.filter(Game.creeps, function(creep: Creep) {
            let role = creep.role() as Role_Role;
            return role.name() === roleName;
        });
    }
}
