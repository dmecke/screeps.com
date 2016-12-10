import { Settings } from "../Settings";
import {Role_Role} from "../Role/Role";

let loadRoomPrototype = function() {
    Room.prototype.hasController = function(this: Room) {
        return this.controller !== undefined;
    };

    Room.prototype.findSourcesByPriority = function(this: Room, creep: Creep) {
        let sources = this.find(FIND_SOURCES);
        sources.sort((a: Source, b: Source): number => b.priority(creep) - a.priority(creep));

        return sources as Source[];
    };

    Room.prototype.findConstructionSitesByPriority = function(this: Room, creep: Creep) {
        let targets = this.find(FIND_CONSTRUCTION_SITES);
        targets.sort((a: ConstructionSite, b: ConstructionSite) => {
            let prioA = a.pos.getRangeTo(creep);
            prioA -= a.structureType === STRUCTURE_CONTAINER ? Settings.BUILD_PRIORITY_CONTAINER : 0;
            prioA -= a.structureType === STRUCTURE_EXTENSION ? Settings.BUILD_PRIORITY_EXTENSION : 0;

            let prioB = b.pos.getRangeTo(creep);
            prioB -= b.structureType === STRUCTURE_CONTAINER ? Settings.BUILD_PRIORITY_CONTAINER : 0;
            prioB -= b.structureType === STRUCTURE_EXTENSION ? Settings.BUILD_PRIORITY_EXTENSION : 0;

            return prioA - prioB;
        });

        return targets as ConstructionSite[];
    };

    Room.prototype.findDamagedStructuresByPriority = function(this: Room, from: Creep|StructureTower) {
        let targets = this.find(FIND_STRUCTURES, {
            filter: (structure: Structure) => {
                return structure.hits < structure.hitsMax && (structure.structureType !== STRUCTURE_WALL && structure.structureType !== STRUCTURE_RAMPART);
            },
        });
        targets.sort(function(a: Structure, b: Structure) {
            return a.pos.getRangeTo(from) - b.pos.getRangeTo(from);
        });

        return targets as Structure[];
    };

    Room.prototype.findDamagedWallsByPriority = function(this: Room) {
        let targets = this.find(FIND_STRUCTURES, {
            filter: (structure: Structure) => {
                return structure.hits < structure.hitsMax && (structure.structureType === STRUCTURE_WALL || structure.structureType === STRUCTURE_RAMPART);
            },
        });
        targets.sort(function(a: Structure, b: Structure) {

            return Math.floor(a.hits / 500) - Math.floor(b.hits / 500);
        });

        return targets as StructureWall[]|StructureRampart[];
    };

    Room.prototype.findNearestDroppedEnergy = function(this: Room, creep: Creep): Resource[] {
        let targets = this.find(FIND_DROPPED_ENERGY);
        targets.sort((a: Resource, b: Resource) => {
            return a.pos.getRangeTo(creep) - b.pos.getRangeTo(creep);
        });

        return targets as Resource[];
    };

    Room.prototype.findNearestDroppedResource = function(this: Room, creep: Creep): Resource[] {
        let targets = this.find(FIND_DROPPED_RESOURCES);
        targets.sort((a: Resource, b: Resource) => {
            return a.pos.getRangeTo(creep) - b.pos.getRangeTo(creep);
        });

        return targets as Resource[];
    };

    Room.prototype.amountOfDroppedEnergy = function(this: Room): number {
        return _.sum(this.find(FIND_DROPPED_ENERGY), (energy: Resource) => energy.amount);
    };

    Room.prototype.findFilledStorages = function(this: Room): StructureContainer[]|StructureStorage[] {
        return this.find(FIND_STRUCTURES, {
            filter: (structure: StructureContainer|StructureStorage) => {
                return (structure.structureType === STRUCTURE_CONTAINER || structure.structureType === STRUCTURE_STORAGE) && structure.store[RESOURCE_ENERGY] > 0;
            },
        }) as StructureContainer[]|StructureStorage[];
    };

    Room.prototype.findSpawnsInNeedOfEnergy = function(this: Room) {
        let targets = this.find(FIND_STRUCTURES, {
            filter: (structure: StructureExtension|StructureSpawn) => {
                return (structure.structureType === STRUCTURE_EXTENSION || structure.structureType === STRUCTURE_SPAWN || structure.structureType === STRUCTURE_CONTAINER) && structure.energy < structure.energyCapacity;
            },
        });

        return targets as StructureSpawn[]|StructureContainer[]|StructureExtension[];
    };

    Room.prototype.findTowersInNeedOfEnergy = function(this: Room) {
        let targets = this.find(FIND_STRUCTURES, {
            filter: (structure: StructureTower) => {
                return structure.structureType === STRUCTURE_TOWER && structure.energy < structure.energyCapacity;
            },
        });

        return targets as StructureTower[];
    };

    Room.prototype.findNearestSpawnInNeedOfEnergy = function(this: Room, creep: Creep) {
        let targets = this.findSpawnsInNeedOfEnergy();
        targets.sort(function(a: Structure, b: Structure) {
            return a.pos.getRangeTo(creep) - b.pos.getRangeTo(creep);
        });

        return targets[0] as StructureSpawn|StructureContainer|StructureExtension;
    };

    Room.prototype.findRandomAdjacentRoom = function(this: Room): string {
        let rooms: string[] = [];
        let exits = Game.map.describeExits(this.name);
        for (let direction in exits) {
            if (exits.hasOwnProperty(direction) && Game.map.isRoomAvailable(exits[direction])) {
                rooms.push(exits[direction]);
            }
        }
        let index = Math.floor(Math.random() * rooms.length);

        return rooms[index];
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

            return role.name() === roleName && (creep.room.name === room.name || role.name() === Settings.ROLE_SCOUT || role.name() === Settings.ROLE_CLAIMER);
        });
    };
};

export = loadRoomPrototype;
