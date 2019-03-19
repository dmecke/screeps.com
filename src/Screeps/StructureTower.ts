let loadStructureTowerPrototype = () => {

    const MEMORY_KEY_TOWERS = "towers";

    Object.defineProperty(StructureTower.prototype, "name", {
        get() {
            return "Tower_" + this.id;
        },
        set(value) {
            throw new Error();
        },
    });

    Object.defineProperty(StructureTower.prototype, "memory", {
        get() {
            if (_.isUndefined(Memory[MEMORY_KEY_TOWERS])) {
                Memory[MEMORY_KEY_TOWERS] = {};
            }
            if (!_.isObject(Memory[MEMORY_KEY_TOWERS])) {
                return undefined;
            }
            return Memory[MEMORY_KEY_TOWERS][this.name] = Memory[MEMORY_KEY_TOWERS][this.name] || {};
        },
        set(value) {
            if (_.isUndefined(Memory[MEMORY_KEY_TOWERS])) {
                Memory[MEMORY_KEY_TOWERS] = {};
            }
            if (!_.isObject(Memory[MEMORY_KEY_TOWERS])) {
                throw new Error("Could not set tower memory.");
            }
            Memory[MEMORY_KEY_TOWERS][this.name] = value;
        },
    });

    StructureTower.prototype.debug = function(this: StructureTower): boolean {
        return this.memory.debug;
    };
};

export = loadStructureTowerPrototype;
