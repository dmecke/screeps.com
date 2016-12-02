import { Role_Builder } from "../Role/Builder";
import { Role_Harvester } from "../Role/Harvester";
import { Role_SpawnSupplier } from "../Role/SpawnSupplier";
import { Role_Transporter } from "../Role/Transporter";
import { Role_Upgrader } from "../Role/Upgrader";
import { Role_Wallie } from "../Role/Wallie";
import { Util_Logger } from "../Util/Logger";
import { Task_Task } from "./Task";
import {Role_Defender} from "../Role/Defender";
import {Role_Scout} from "../Role/Scout";

export class Task_Spawn extends Task_Task {
    public static NUMBER_OF_HARVESTER = 4;
    public static NUMBER_OF_UPGRADER = 1;
    public static NUMBER_OF_TRANSPORTER = 4;
    public static NUMBER_OF_SPAWN_SUPPLIER = 3;
    public static NUMBER_OF_WALLIE = 1;
    public static NUMBER_OF_DEFENDER = 1;
    public static NUMBER_OF_SCOUT = 1;
    public static BUILDER_MINIMUM = 1;
    public static BUILDER_MAXIMUM = 10;

    private static minimumCreepCount(role: string) {
        switch (role) {
            case Role_Harvester.role():
                return Task_Spawn.NUMBER_OF_HARVESTER;

            case Role_Builder.role():
                return Task_Spawn.BUILDER_MINIMUM;

            case Role_Upgrader.role():
                return Task_Spawn.NUMBER_OF_UPGRADER;

            case Role_Transporter.role():
                return Task_Spawn.NUMBER_OF_TRANSPORTER;

            case Role_SpawnSupplier.role():
                return Task_Spawn.NUMBER_OF_SPAWN_SUPPLIER;

            case Role_Wallie.role():
                return Task_Spawn.NUMBER_OF_WALLIE;

            case Role_Defender.role():
                return Task_Spawn.NUMBER_OF_DEFENDER;

            case Role_Scout.role():
                return Task_Spawn.NUMBER_OF_SCOUT;

            default:
                Util_Logger.error("Cannot find minimum creep count for illegal role '" + role + "'");
                throw new Error();
        }
    }

    private static roles(): string[] {
        return [Role_Scout.role(), Role_Defender.role(), Role_Wallie.role(), Role_Builder.role(), Role_Upgrader.role(), Role_Transporter.role(), Role_SpawnSupplier.role(), Role_Harvester.role()];
    }

    private static bodyParts(role: string, spawn: StructureSpawn) {
        let base: string[];
        let big: string[];
        switch (role) {
            case Role_Harvester.role():
                base = [WORK, WORK, CARRY, MOVE];
                big = [WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE];
                break;

            case Role_Builder.role():
                base = [WORK, CARRY, MOVE, MOVE, MOVE];
                big = [WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE];
                break;

            case Role_Wallie.role():
                base = [WORK, WORK, CARRY, MOVE];
                big = [WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE];
                break;

            case Role_Upgrader.role():
                base = [WORK, CARRY, MOVE, MOVE, MOVE];
                big = [WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE];
                break;

            case Role_Transporter.role():
                base = [CARRY, CARRY, CARRY, MOVE, MOVE, MOVE];
                big = [CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE];
                break;

            case Role_SpawnSupplier.role():
                base = [WORK, CARRY, CARRY, MOVE, MOVE];
                big = [WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE];
                break;

            case Role_Defender.role():
                base = [ATTACK, ATTACK, ATTACK, TOUGH, MOVE];
                big = [ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, MOVE, MOVE, MOVE];
                break;

            case Role_Scout.role():
                base = [MOVE, MOVE, MOVE, MOVE, MOVE, MOVE];
                big = [MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE];
                break;

            default:
                Util_Logger.error("Cannot detect body parts. Illegal role '" + role + "'");
                throw new Error();
        }

        return spawn.room.energyCapacityAvailable >= 550 ? big : base;
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
        if (!spawned && this.creepsOfRole(Role_Builder.role()).length < Task_Spawn.BUILDER_MAXIMUM) {
            this.spawn(Role_Builder.role(), spawnName);
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
            experimental: false,
            home_room: spawn.room.name,
            role,
            state: "Wait",
            target_room: spawn.room.name,
        });
        if (!Number(newName)) {
            Util_Logger.info("Spawning new " + role + ": " + newName + ".");
        } else if (this.creepsOfRole(role).length < Task_Spawn.minimumCreepCount(role)) {
            if (newName === ERR_NOT_ENOUGH_ENERGY) {
                Util_Logger.warn("Not enough energy to spawn new " + role + ". There are only " + this.creepsOfRole(role).length + ", but there should be at least " + Task_Spawn.minimumCreepCount(role) + ".");
            } else if (newName === ERR_BUSY) {
                Util_Logger.warn("Cannot spawn " + role + ", already busy spawning another creep. There are only " + this.creepsOfRole(role).length + ", but there should be at least " + Task_Spawn.minimumCreepCount(role) + ".");
            }
        }
    }

    private creepsOfRole(role: string): Creep[] {
        return _.filter(Game.creeps, function(creep: Creep) {
            return creep.role() === role;
        });
    }
}
