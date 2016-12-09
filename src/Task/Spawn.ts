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
import {Role_Claimer} from "../Role/Claimer";

export class Task_Spawn extends Task_Task {
    public static NUMBER_OF_HARVESTER = 4;
    public static NUMBER_OF_UPGRADER = 1;
    public static NUMBER_OF_TRANSPORTER = 0; // 4; currently not needed as all creeps take the energy directly from the containers near the sources
    public static NUMBER_OF_SPAWN_SUPPLIER = 3;
    public static NUMBER_OF_WALLIE = 2;
    public static NUMBER_OF_DEFENDER = 0;
    public static NUMBER_OF_SCOUT = 1;
    public static NUMBER_OF_CLAIMER = 0;
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

            case Settings.ROLE_CLAIMER:
                return Task_Spawn.NUMBER_OF_CLAIMER;

            default:
                Util_Logger.error("Cannot find minimum creep count for illegal name '" + role + "'");
                throw new Error();
        }
    }

    private static roles(): string[] {
        return [
            Settings.ROLE_CLAIMER,
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
        let energyAvailable = spawn.room.energyAvailable;

        switch (role) {
            case Settings.ROLE_HARVESTER:
                let energy = spawn.room.creepsOfRole(Settings.ROLE_HARVESTER).length > 0 ? energyCapacityAvailable : energyAvailable;

                return Role_Harvester.bodyParts(energy);

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

            case Settings.ROLE_CLAIMER:
                return Role_Claimer.bodyParts(energyCapacityAvailable);

            default:
                Util_Logger.error("Cannot detect body parts. Illegal name '" + role + "'");
                throw new Error();
        }
    }

    public execute() {
        Util_Logger.info("");
        Util_Logger.info("=== <span style='color: #5599e6'>Report</span> ===");
        for (let spawnName in Game.spawns) {
            if (Game.spawns.hasOwnProperty(spawnName)) {
                let spawned = false;
                let spawn = Game.spawns[spawnName];
                if (Settings.WISHLIST_ROOMS.length > 0 && spawn.room.creepsOfRole(Settings.ROLE_CLAIMER).length < 2) {
                    this.spawn(Settings.ROLE_CLAIMER, spawnName, Settings.WISHLIST_ROOMS[0]); // @todo handle all wishlist rooms, not just the first
                }
                for (let role of Task_Spawn.roles()) {
                    if (spawn.room.creepsOfRole(role).length < Task_Spawn.minimumCreepCount(role)) {
                        this.spawn(role, spawnName);
                        spawned = true;
                    }
                }
                if (!spawned && spawn.room.creepsOfRole(Settings.ROLE_BUILDER).length < Task_Spawn.BUILDER_MAXIMUM) {
                    this.spawn(Settings.ROLE_BUILDER, spawnName);
                }
                this.logStatistics(spawn.room);
            }
        }
    }

    // @todo extract reporting to own task
    // @todo order rooms from east to west (and if equal from north to south)
    // @todo show global creep counts separated from rooms (in a general statistics row above the room statistics)
    private logStatistics(room: Room): void {
        let message: string[] = [];
        for (let role of Task_Spawn.roles()) {
            let color = room.creepsOfRole(role).length >= Task_Spawn.minimumCreepCount(role) ? "#79CB44" : "#ff5646";
            message.push(role + " <span style='color:" + color + "'>" + room.creepsOfRole(role).length + " / " + Task_Spawn.minimumCreepCount(role) + "</span>");
        }
        Util_Logger.info(room.name + ": " + this.getLevelReport(room) + "  |  " + this.getEnergyReport(room) + "  |  " + message.join("  |  "));
    }

    private getLevelReport(room: Room): string {
        let formattedProgress = room.controller.progress.toString().numberFormat(0, ",", ".");
        let formattedProgressTotal = room.controller.progressTotal.toString().numberFormat(0, ",", ".");

        return "RCL " + room.controller.level + "  " + ("          ".substring(0, 8 - formattedProgress.length) + formattedProgress) + " / " + ("          ".substring(0, 8 - formattedProgressTotal.length) + formattedProgressTotal);
    }

    private getEnergyReport(room: Room): string {
        let color = room.energyAvailable === room.energyCapacityAvailable ? "#79CB44" : "#ffd85b";
        let available = room.energyAvailable.toString();
        let capacity = room.energyCapacityAvailable.toString();

        return "Energy <span style='color: " + color + "'>" + available.pad(4) + " / " + capacity.pad(4) + "</span>";
    }

    private spawn(role: string, spawnName: string, targetRoom: string = ""): string|number {
        let spawn = Game.spawns[spawnName];
        let newName = spawn.createCreep(Task_Spawn.bodyParts(role, spawn), undefined, {
            blackboard: {},
            blacklisted_rooms: Settings.BLACKLISTED_ROOMS,
            debug: false,
            experimental: false,
            home_room: spawn.room.name,
            role,
            target_room: targetRoom ? targetRoom : spawn.room.name,
        });
        if (!Number(newName)) {
            let creep = Game.creeps[newName];
            let r = creep.role() as Role_Role;
            let roleName = r.name();
            if (roleName === Settings.ROLE_SCOUT) {
                creep.notifyWhenAttacked(false);
            }
            Util_Logger.info("Spawning new " + roleName + ": " + newName + ".");
        }

        return newName;
    }
}
