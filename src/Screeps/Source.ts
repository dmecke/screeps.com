import {Settings} from "../Settings";

const loadSourcePrototype = () => {

    Source.prototype.priority = function(this: Source, creep: Creep): number {
        if (this.energy === 0) {
            return -10000;
        }

        if (this.pos.getRangeTo(creep) <= 1) {
            return 10000;
        }

        if (this.harvestingSpots().length === 0) {
            return -10000;
        }

        const energyAvailable = this.energy;
        const distanceMalus = this.pos.getRangeTo(creep) * 100;

        return energyAvailable - distanceMalus;
    };

    Source.prototype.harvestingSpots = function(this: Source): RoomPosition[] {
        const potentialHarvestingPositions = this.pos.outerPositionsInRange(1);

        return _.filter(potentialHarvestingPositions, (position: RoomPosition) => {
            const terrain = position.lookFor(LOOK_TERRAIN)[0];
            return (terrain === "plain" || terrain === "swamp") && position.lookFor(LOOK_CREEPS).length === 0;
        });
    };

    Source.prototype.hasAttachedContainer = function(this: Source): boolean {
        return this.attachedContainer() !== undefined;
    };

    Source.prototype.attachedContainer = function(this: Source): StructureContainer {
        const containers = _.filter(this.pos.findInRange(FIND_STRUCTURES, Settings.BUILD_DISTANCE_CONTAINER),
            (structure: Structure) => structure.structureType === STRUCTURE_CONTAINER,
        );

        if (containers.length === 0) {
            return undefined;
        }

        return containers[0] as StructureContainer;
    };
};

export = loadSourcePrototype;
