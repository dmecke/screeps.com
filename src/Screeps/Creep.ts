let loadCreepPrototype = function() {
    Creep.prototype.role = function(this: Creep): string {
        return this.memory.role;
    };

    Creep.prototype.state = function(this: Creep): string {
        return this.memory.state;
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

    Creep.prototype.isInTargetRoom = function(this: Creep): boolean {
        return this.targetRoom() === this.room.name || this.targetRoom() === undefined; // @todo remove undefined case when every creep has a target_room
    };

    Creep.prototype.isInHomeRoom = function(this: Creep): boolean {
        return this.homeRoom() === this.room.name || this.homeRoom() === undefined; // @todo remove undefined case when every creep has a home_room
    };

    Creep.prototype.moveToRoom = function(this: Creep, room: string): void {
        this.moveTo(new RoomPosition(25, 25, room));
    };

    Creep.prototype.moveHome = function(this: Creep): void {
        if (this.isInHomeRoom()) {
            return;
        }

        this.moveToRoom(this.homeRoom());
    };
};

export = loadCreepPrototype;
