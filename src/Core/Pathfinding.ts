export class Pathfinding {

    public findPath(start: RoomPosition, destination: RoomPosition): PathStep[] {
        const steps = start.findPathTo(destination); // @todo cache!

        return steps;
    }
}
