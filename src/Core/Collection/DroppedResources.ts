export class DroppedResources implements IDroppedResources {

    private droppedResources: Resource[];

    public constructor(droppedResources: Resource[] = []) {
        this.droppedResources = droppedResources;
    }

    public is(resource: string): DroppedResources {
        return new DroppedResources(
            _.filter(this.droppedResources, function(r: Resource) {
                return r.resourceType === resource;
            }),
        );
    }

    public closestByPath(pos: RoomPosition): Resource {
        return pos.findClosestByPath(this.droppedResources);
    }

    public none(): boolean {
        return this.droppedResources.length === 0;
    }

    public exist(): boolean {
        return this.droppedResources.length > 0;
    }

    public amount(): number {
        return _.sum(this.droppedResources, (resource: Resource) => resource.amount);
    }
}
