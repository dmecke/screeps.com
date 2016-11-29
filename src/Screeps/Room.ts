import { Settings } from "../Settings";
import { Role_SpawnSupplier } from "./../Role/SpawnSupplier";
import { Role_Transporter } from "./../Role/Transporter";

let loadRoomPrototype = function() {
    Room.prototype.hasTransporter = function(this: Room) {
        return this.find(FIND_MY_CREEPS, {
            filter: (creep: Creep) => creep.role() === Role_Transporter.role(),
        }).length > 0;
    };

    Room.prototype.hasSpawnSupplier = function(this: Room) {
        return this.find(FIND_MY_CREEPS, {
            filter: (creep: Creep) => creep.role() === Role_SpawnSupplier.role(),
        }).length > 0;
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

    Room.prototype.findDamagedStructuresByPriority = function(this: Room, creep: Creep) {
        let targets = this.find(FIND_STRUCTURES, {
            filter: (structure: Structure) => {
                return structure.hits < structure.hitsMax && (structure.structureType !== STRUCTURE_WALL && structure.structureType !== STRUCTURE_RAMPART);
            },
        });
        targets.sort(function(a: Structure, b: Structure) {
            return a.pos.getRangeTo(creep) - b.pos.getRangeTo(creep);
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
            let multiplierA = a.structureType === STRUCTURE_WALL ? 100000 : 100;
            let prioA = Math.floor(a.hits / a.hitsMax * multiplierA);
            if (a.hits < 10000) {
                prioA = -1;
            }

            let multiplierB = b.structureType === STRUCTURE_WALL ? 100000 : 100;
            let prioB = Math.floor(b.hits / b.hitsMax * multiplierB);
            if (b.hits < 10000) {
                prioB = -1;
            }

            return prioA - prioB;
        });

        return targets as StructureWall[]|StructureRampart[];
    };

    Room.prototype.findNearestDroppedEnergy = function(this: Room, creep: Creep) {
        let targets = this.find(FIND_DROPPED_ENERGY);
        targets.sort((a: Resource, b: Resource) => {
            return a.pos.getRangeTo(creep) - b.pos.getRangeTo(creep);
        });

        return targets as Resource[];
    };

    Room.prototype.findNearestFilledStorage = function(this: Room, creep: Creep) {
        let targets = this.find(FIND_STRUCTURES, {
            filter: (structure: StructureContainer|StructureStorage) => {
                return (structure.structureType === STRUCTURE_CONTAINER || structure.structureType === STRUCTURE_STORAGE) && structure.store[RESOURCE_ENERGY] > 0;
            },
        });
        targets.sort(function(a: Structure, b: Structure) {
            return a.pos.getRangeTo(creep) - b.pos.getRangeTo(creep);
        });

        return targets as StructureContainer[]|StructureStorage[];
    };

    Room.prototype.findSpawnsInNeedOfEnergy = function(this: Room, creep: Creep) {
        let targets = this.find(FIND_STRUCTURES, {
            filter: (structure: StructureExtension|StructureSpawn) => {
                return (structure.structureType === STRUCTURE_EXTENSION || structure.structureType === STRUCTURE_SPAWN || structure.structureType === STRUCTURE_CONTAINER) && structure.energy < structure.energyCapacity;
            },
        });
        targets.sort(function(a: Structure, b: Structure) {
            return a.pos.getRangeTo(creep) - b.pos.getRangeTo(creep);
        });

        return targets as StructureSpawn[]|StructureContainer[]|StructureExtension[];
    };
};

export = loadRoomPrototype;
