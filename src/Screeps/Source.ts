let loadSourcePrototype = function() {
    Source.prototype.priority = function (this: Source, creep: Creep): number
    {
        if (this.energy === 0) {
            return -10000;
        }
        if (this.pos.getRangeTo(creep) <= 1) {
            return 10000;
        }

        let energy = this.energy;
        let creeps = this.pos.findInRange(FIND_CREEPS, 1, {
                filter: (c: Creep) => c.id !== creep.id,
            }).length * 1000;
        let distance = this.pos.getRangeTo(creep) * 60;

        return energy - creeps - distance;
    };
};

export = loadSourcePrototype;
