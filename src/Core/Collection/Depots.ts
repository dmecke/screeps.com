import {Settings} from "../../Settings";

export class Depots implements IDepots {

    private readonly depots: (StructureStorage|StructureContainer)[];

    public constructor(depots: (StructureStorage|StructureContainer)[] = []) {
        this.depots = depots;
    }

    public contains(resource: string): Depots {
        return new Depots(
            _.filter(this.depots, (depot: StructureStorage|StructureContainer) => {
                return depot.store[resource] > 0;
            }),
        );
    }

    public notFull(): Depots {
        return new Depots(
            _.filter(this.depots, (depot: StructureStorage|StructureContainer) => {
                return _.sum(depot.store) < depot.storeCapacity;
            }),
        );
    }

    public canStore(amount: number): Depots {
        return new Depots(
            _.filter(this.depots, (depot: StructureStorage|StructureContainer) => {
                return _.sum(depot.store) + amount <= depot.storeCapacity;
            }),
        );
    }

    public nextToSource(): Depots {
        return new Depots(
            _.filter(this.depots, (depot: StructureStorage|StructureContainer) => {
                return depot.pos.findInRange(FIND_SOURCES, Settings.BUILD_DISTANCE_CONTAINER).length > 0;
            }),
        );
    }

    public nextToMySpawn(): Depots {
        return new Depots(
            _.filter(this.depots, (depot: StructureStorage|StructureContainer) => {
                return depot.pos.findInRange(FIND_MY_SPAWNS, Settings.BUILD_DISTANCE_CONTAINER).length > 0;
            }),
        );
    }

    public nextToController(): Depots {
        return new Depots(
            _.filter(this.depots, (depot: StructureStorage|StructureContainer) => {
                return depot.pos.findInRange(FIND_STRUCTURES, Settings.BUILD_DISTANCE_CONTAINER, {
                    filter: (structure: Structure) => structure.structureType === STRUCTURE_CONTROLLER,
                }).length > 0;
            }),
        );
    }

    public closestByPath(pos: RoomPosition): StructureStorage|StructureContainer {
        return pos.findClosestByPath(this.depots);
    }

    public exist(): boolean {
        return this.depots.length > 0;
    }
}
