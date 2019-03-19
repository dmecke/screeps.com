import {Role_Role} from "../Role/Role";
import {Role_Factory} from "../Role/Factory";
import {Depots} from "../Core/Collection/Depots";
import {Rooms} from "../Core/Collection/Rooms";
import {Spawns} from "../Core/Collection/Spawns";
import {DroppedResources} from "../Core/Collection/DroppedResources";
import {Towers} from "../Core/Collection/Towers";
import {WallsAndRamparts} from "../Core/Collection/WallsAndRamparts";
import {Sources} from "../Core/Collection/Sources";
import {Structures} from "../Core/Collection/Structures";
import {ConstructionSites} from "../Core/Collection/ConstructionSites";

let loadRoomPrototype = function() {

    Room.prototype.hasController = function(this: Room) {
        return this.controller !== undefined;
    };

    Room.prototype.findStructures = function(this: Room): Structures {
        return new Structures(
            this.find(FIND_STRUCTURES) as Structure[],
        );
    };

    Room.prototype.findSources = function(this: Room): Sources {
        return new Sources(
            this.find(FIND_SOURCES) as Source[],
        );
    };

    Room.prototype.findConstructionSites = function(this: Room): ConstructionSites {
        return new ConstructionSites(
            this.find(FIND_CONSTRUCTION_SITES) as ConstructionSite[],
        );
    };

    Room.prototype.findWallsAndRamparts = function(this: Room): WallsAndRamparts {
        return new WallsAndRamparts(
            this.find(FIND_STRUCTURES, {
                filter: (structure: Structure) => structure.structureType === STRUCTURE_WALL || structure.structureType === STRUCTURE_RAMPART,
            }) as StructureWall[]|StructureRampart[],
        );
    };

    Room.prototype.findDepots = function(this: Room): Depots {
        return new Depots(
            this.find(FIND_STRUCTURES, {
                filter: (structure: Structure) => structure.structureType === STRUCTURE_CONTAINER || structure.structureType === STRUCTURE_STORAGE,
            }) as StructureContainer[]|StructureStorage[],
        );
    };

    Room.prototype.findSpawns = function(this: Room): Spawns {
        return new Spawns(
            this.find(FIND_STRUCTURES, {
                filter: (structure: Structure) => structure.structureType === STRUCTURE_SPAWN || structure.structureType === STRUCTURE_EXTENSION,
            }) as StructureSpawn[]|StructureExtension[],
        );
    };

    Room.prototype.findTowers = function(this: Room): Towers {
        return new Towers(
            this.find(FIND_STRUCTURES, {
                filter: (structure: Structure) => structure.structureType === STRUCTURE_TOWER,
            }) as StructureTower[],
        );
    };

    Room.prototype.findDroppedResources = function(this: Room): DroppedResources {
        return new DroppedResources(
            this.find(FIND_DROPPED_RESOURCES) as Resource[],
        );
    };

    Room.prototype.amountOfDroppedEnergy = function(this: Room): number {
        return this.findDroppedResources().is(RESOURCE_ENERGY).amount();
    };

    Room.prototype.findRandomAdjacentRoom = function(this: Room): string {
        let rooms = new Rooms();
        let exits = Game.map.describeExits(this.name);
        for (let direction in exits) {
            if (exits.hasOwnProperty(direction) && Game.map.isRoomAvailable(exits[direction])) {
                rooms.add(exits[direction]);
            }
        }

        return rooms.random();
    };

    Room.prototype.trackInfo = function(this: Room): void {
        this.memory.info = {
            dropped_energy: this.amountOfDroppedEnergy(),
            energy_available: this.energyAvailable,
            energy_capacity_available: this.energyCapacityAvailable,
            has_controller: this.controller !== undefined,
            has_storage: this.storage !== undefined,
            has_terminal: this.terminal !== undefined,
            last_visited: new Date(),
            number_of_hostile_creeps: this.find(FIND_HOSTILE_CREEPS).length,
            number_of_sources: this.find(FIND_SOURCES).length,
            rcl: this.controller !== undefined ? this.controller.level : null,
        };
    };

    Room.prototype.creepsOfRole = function(this: Room, roleName: string): Creep[] {
        let room = this;
        return _.filter(Game.creeps, function(creep: Creep) {
            let role = creep.role() as Role_Role;

            return role.name() === roleName && (creep.room.name === room.name || Role_Factory.isRoomIndependant(roleName));
        });
    };
};

export = loadRoomPrototype;
