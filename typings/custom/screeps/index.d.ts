interface RoomPosition {
    positionsInRange(range: number): RoomPosition[];
    outerPositionsInRange(range: number): RoomPosition[];
}
interface Room {
    hasTransporter(): boolean;
    hasSpawnSupplier(): boolean;
    findSourcesByPriority(creep: Creep): Array<Source>;
    findConstructionSitesByPriority(creep: Creep): Array<ConstructionSite>;
    findDamagedStructuresByPriority(creep: Creep): Array<Structure>;
    findDamagedWallsByPriority(): Array<StructureWall|StructureRampart>;
    findNearestDroppedEnergy(creep: Creep): Array<Resource>;
    findNearestFilledStorage(creep: Creep): Array<StructureStorage|StructureContainer>;
    findSpawnsInNeedOfEnergy(creep: Creep): Array<StructureSpawn|StructureExtension|StructureContainer>;
}
interface Structure {
    hasCloseContainer(): boolean;
    buildCloseContainer(): void;
}
interface Source {
    priority(creep: Creep): number;
    harvestingSpots(): RoomPosition[];
}
interface Creep {
    role(): string;
    state(): string;
}
