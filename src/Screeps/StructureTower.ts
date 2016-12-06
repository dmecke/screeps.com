let loadStructureTowerPrototype = function() {

    const MEMORY_KEY_TOWERS = "towers";

    Object.defineProperty(StructureTower.prototype, "memory", {
        get: function(this: StructureTower) {
            if (_.isUndefined(Memory[MEMORY_KEY_TOWERS])) {
                Memory[MEMORY_KEY_TOWERS] = {};
            }
            if (!_.isObject(Memory[MEMORY_KEY_TOWERS])) {
                return undefined;
            }
            return Memory[MEMORY_KEY_TOWERS][this.id] = Memory[MEMORY_KEY_TOWERS][this.id] || {};
        },
        set: function(this: StructureTower, value) {
            if (_.isUndefined(Memory[MEMORY_KEY_TOWERS])) {
                Memory[MEMORY_KEY_TOWERS] = {};
            }
            if (!_.isObject(Memory[MEMORY_KEY_TOWERS])) {
                throw new Error("Could not set tower memory.");
            }
            Memory[MEMORY_KEY_TOWERS][this.id] = value;
        },
    });

    StructureTower.prototype.debug = function(this: StructureTower): boolean {
        return this.memory.debug;
    };

    StructureTower.prototype.constructor = function(this: StructureTower) {
        this.name = "Tower " + this.id;
    };
};

export = loadStructureTowerPrototype;
