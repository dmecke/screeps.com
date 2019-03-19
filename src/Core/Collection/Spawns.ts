export class Spawns implements ISpawns {

    private readonly spawns: Array<StructureSpawn|StructureExtension>;

    public constructor(spawns: Array<StructureSpawn|StructureExtension> = []) {
        this.spawns = spawns;
    }

    public inNeedOfEnergy(): Spawns {
        return new Spawns(
            _.filter(this.spawns, function(spawn: StructureSpawn|StructureExtension) {
                return spawn.energy < spawn.energyCapacity;
            })
        );
    }

    public closestByPath(pos: RoomPosition): StructureSpawn|StructureExtension {
        return pos.findClosestByPath(this.spawns);
    }

    public none(): boolean {
        return this.spawns.length === 0;
    }

    public exist(): boolean {
        return this.spawns.length > 0;
    }
}
