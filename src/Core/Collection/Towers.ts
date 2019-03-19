export class Towers implements ITowers {

    private readonly towers: StructureTower[];

    public constructor(towers: StructureTower[] = []) {
        this.towers = towers;
    }

    public inNeedOfEnergy(): Towers {
        return new Towers(
            _.filter(this.towers, (tower: StructureTower) => tower.energy < tower.energyCapacity),
        );
    }

    public closestByPath(pos: RoomPosition): StructureTower {
        return pos.findClosestByPath(this.towers);
    }

    public none(): boolean {
        return this.towers.length === 0;
    }

    public exist(): boolean {
        return this.towers.length > 0;
    }
}
