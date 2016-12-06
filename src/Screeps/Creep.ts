import {Settings} from "../Settings";
import {Util_Logger} from "../Util/Logger";
import {Role_Harvester} from "../Role/Harvester";
import {Role_Builder} from "../Role/Builder";
import {Role_Upgrader} from "../Role/Upgrader";
import {Role_Transporter} from "../Role/Transporter";
import {Role_SpawnSupplier} from "../Role/SpawnSupplier";
import {Role_Wallie} from "../Role/Wallie";
import {Role_Defender} from "../Role/Defender";
import {Role_Scout} from "../Role/Scout";
import {Role_Role} from "../Role/Role";
import {Role_Claimer} from "../Role/Claimer";

let loadCreepPrototype = function() {

    Creep.prototype.role = function(this: Creep): Role_Role {
        switch (this.memory.role) {
            case Settings.ROLE_HARVESTER:
                return new Role_Harvester(this);

            case Settings.ROLE_BUILDER:
                return new Role_Builder(this);

            case Settings.ROLE_UPGRADER:
                return new Role_Upgrader(this);

            case Settings.ROLE_TRANSPORTER:
                return new Role_Transporter(this);

            case Settings.ROLE_SPAWN_SUPPLIER:
                return new Role_SpawnSupplier(this);

            case Settings.ROLE_WALLIE:
                return new Role_Wallie(this);

            case Settings.ROLE_DEFENDER:
                return new Role_Defender(this);

            case Settings.ROLE_SCOUT:
                return new Role_Scout(this);

            case Settings.ROLE_CLAIMER:
                return new Role_Claimer(this);

            default:
                Util_Logger.error(this.name + " has an invalid role: '" + this.memory.role + "'");
                throw new Error();
        }
    };

    Creep.prototype.debug = function(this: Creep): boolean {
        return this.memory.debug;
    };

    Creep.prototype.blacklistedRooms = function(this: Creep): string[] {
        return this.memory.blacklisted_rooms;
    };

    Creep.prototype.carryAmount = function(this: Creep): number {
        return _.sum(this.carry);
    };

    Creep.prototype.homeRoom = function(this: Creep): string {
        return this.memory.home_room;
    };

    Creep.prototype.targetRoom = function(this: Creep): string {
        return this.memory.target_room;
    };

    Creep.prototype.moveToTargetRoom = function(this: Creep): void {
        this.moveToRoom(this.targetRoom());
    };

    Creep.prototype.isInRoom = function(this: Creep, room: string): boolean {
        return this.room.name === room;
    };

    Creep.prototype.isInTargetRoom = function(this: Creep): boolean {
        return this.isInRoom(this.targetRoom());
    };

    Creep.prototype.isInHomeRoom = function(this: Creep): boolean {
        return this.isInRoom(this.homeRoom());
    };

    Creep.prototype.moveToRoom = function(this: Creep, room: string): number {
        return this.moveTo(new RoomPosition(25, 25, room));
    };

    Creep.prototype.findNearestFilledStorage = function(this: Creep): StructureContainer|StructureStorage {
        let targets = this.room.findFilledStorages();
        let creep = this;
        targets.sort(function(a: Structure, b: Structure) {
            return a.pos.getRangeTo(creep) - b.pos.getRangeTo(creep);
        });

        return targets[0] as StructureContainer|StructureStorage;
    };

    Creep.prototype.findNearestUnfilledStorage = function(this: Creep): StructureContainer|StructureStorage {
        let targets = this.room.find(FIND_STRUCTURES, {
            filter: (structure: StructureContainer|StructureStorage) => {
                return (structure.structureType === STRUCTURE_CONTAINER || structure.structureType === STRUCTURE_STORAGE) && structure.store[RESOURCE_ENERGY] < structure.storeCapacity;
            },
        });
        let creep = this;
        targets.sort(function(a: StructureContainer, b: StructureContainer) {
            return a.pos.getRangeTo(creep) - b.pos.getRangeTo(creep);
        });

        return targets[0] as StructureContainer|StructureStorage;
    };

    Creep.prototype.findNearestTowerInNeedOfEnergy = function(this: Creep): StructureTower {
        let towers = this.room.findTowersInNeedOfEnergy();
        let creep = this;
        towers.sort(function(a: Structure, b: Structure) {
            return a.pos.getRangeTo(creep) - b.pos.getRangeTo(creep);
        });

        return towers[0] as StructureTower;
    };
};

export = loadCreepPrototype;
