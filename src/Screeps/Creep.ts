let loadCreepPrototype = function() {
    Creep.prototype.role = function(this: Creep): string {
        return this.memory.role;
    };

    Creep.prototype.state = function(this: Creep): string {
        return this.memory.state;
    };
};

export = loadCreepPrototype;
