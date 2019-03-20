export default class RoomRepository {

    public findWithOwnedController(): Room[] {
        const rooms = [];
        for (const key in Game.rooms) {
            if (Game.rooms.hasOwnProperty(key)) {
                const room = Game.rooms[key];
                if (room.controller !== undefined && room.controller.my) {
                    rooms.push(room);
                }
            }
        }

        return rooms;
    }
}
