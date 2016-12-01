let loadRoomPositionPrototype = function() {
    RoomPosition.prototype.positionsInRange = function(this: RoomPosition, range: number): RoomPosition[]
    {
        let positions: RoomPosition[] = [];
        for (let x = -range; x <= range; x++) {
            for (let y = -range; y <= range; y++) {
                let position = new RoomPosition(this.x + x, this.y + y, this.roomName);
                positions.push(position);
            }
        }

        return positions;
    };

    RoomPosition.prototype.outerPositionsInRange = function(this: RoomPosition, range: number): RoomPosition[]
    {
        let self = this;
        return _.filter(this.positionsInRange(range), function(position: RoomPosition) {
            return self.getRangeTo(position) === range;
        });
    };
};

export = loadRoomPositionPrototype;
