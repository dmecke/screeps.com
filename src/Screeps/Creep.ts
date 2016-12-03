let loadCreepPrototype = function() {
    Creep.prototype.role = function(this: Creep): string {
        return this.memory.role;
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
};

export = loadCreepPrototype;
