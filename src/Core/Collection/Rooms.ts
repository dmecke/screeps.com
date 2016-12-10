export class Rooms {

    private rooms: string[];

    public constructor(rooms: string[] = []) {
        this.rooms = rooms;
    }

    public add(room: string): void {
        this.rooms.push(room);
    }

    public random(): string {
        let index = Math.floor(Math.random() * this.rooms.length);

        return this.rooms[index];
    }
}
