interface RoomPosition {
    positionsInRange(range: number): RoomPosition[];
    outerPositionsInRange(range: number): RoomPosition[];
    hasCloseContainer(): boolean;
    buildCloseContainer(): void;
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
    findRandomAdjacentRoom(): string;
    amountOfDroppedEnergy(): number;
    trackInfo(): void;
}
interface Source {
    priority(creep: Creep): number;
    harvestingSpots(): RoomPosition[];
}
interface Creep {
    role(): string;
    state(): string;
    targetRoom(): string;
    homeRoom(): string;
    moveToTargetRoom(): void;
    isInTargetRoom(): boolean;
    isInHomeRoom(): boolean;
    moveHome(): void;
    moveToRoom(room: string): void;
}
