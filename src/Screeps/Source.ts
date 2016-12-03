let loadSourcePrototype = function() {
    Source.prototype.priority = function(this: Source, creep: Creep): number
    {
        if (this.energy === 0) {
            return -10000;
        }
        if (this.pos.getRangeTo(creep) <= 1) {
            return 10000;
        }

        let energyAvailable = this.energy;
        let availableSpotsMalus = Math.min(0, 3000 - this.harvestingSpots().length * 1000);
        let distanceMalus = this.pos.getRangeTo(creep) * 60;

        return energyAvailable - availableSpotsMalus - distanceMalus;
    };

    Source.prototype.harvestingSpots = function(this: Source): RoomPosition[]
    {
        let potentialHarvestingPositions = this.pos.outerPositionsInRange(1);

        return _.filter(potentialHarvestingPositions, function(position: RoomPosition) {
            let terrain = position.lookFor(LOOK_TERRAIN)[0];
            return (terrain === "plain" || terrain === "swamp") && position.lookFor(LOOK_CREEPS).length === 0;
        });
    };
};

export = loadSourcePrototype;
