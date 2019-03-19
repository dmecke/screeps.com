export class Structures implements IStructures {

    private readonly structures: Structure[];

    public constructor(structures: Structure[] = []) {
        this.structures = structures;
    }

    public onlyMine(): Structures {
        return new Structures(
            _.filter(this.structures, (structure: Structure) => {
                if (structure instanceof OwnedStructure) {
                    return structure.my;
                }

                return false;
            }),
        );
    }

    public notHostile(): Structures {
        return new Structures(
            _.filter(this.structures, (structure: Structure) => {
                if (structure instanceof OwnedStructure) {
                    return structure.my;
                }

                return true;
            }),
        );
    }

    public notWall(): Structures {
        return new Structures(
            _.filter(this.structures, (structure: Structure) => structure.structureType !== STRUCTURE_WALL),
        );
    }

    public notRampart(): Structures {
        return new Structures(
            _.filter(this.structures, (structure: Structure) => structure.structureType !== STRUCTURE_RAMPART),
        );
    }

    public whichHaveNotMaxHitpoints(): Structures {
        return new Structures(
            _.filter(this.structures, (structure: Structure) => structure.hits < structure.hitsMax),
        );
    }

    public closestByPath(pos: RoomPosition): Structure {
        return pos.findClosestByPath(this.structures);
    }

    public none(): boolean {
        return this.structures.length === 0;
    }

    public exist(): boolean {
        return this.structures.length > 0;
    }
}
