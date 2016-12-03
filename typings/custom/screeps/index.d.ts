interface RoomPosition {
    positionsInRange(range: number): RoomPosition[];
    outerPositionsInRange(range: number): RoomPosition[];
    hasCloseContainer(): boolean;
    buildCloseContainer(): void;
}
interface Room {
    hasController(): boolean;
    findSourcesByPriority(creep: Creep): Array<Source>;
    findConstructionSitesByPriority(creep: Creep): Array<ConstructionSite>;
    findDamagedStructuresByPriority(creep: Creep): Array<Structure>;
    findDamagedWallsByPriority(): Array<StructureWall|StructureRampart>;
    findNearestDroppedEnergy(creep: Creep): Array<Resource>;
    findFilledStorages(): Array<StructureStorage|StructureContainer>;
    findNearestFilledStorage(creep: Creep): Array<StructureStorage|StructureContainer>;
    findNearestUnfilledStorage(creep: Creep): Array<StructureStorage|StructureContainer>;
    findSpawnsInNeedOfEnergy(): Array<StructureSpawn|StructureExtension|StructureContainer>;
    findNearestSpawnInNeedOfEnergy(creep: Creep): StructureSpawn|StructureExtension|StructureContainer;
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
    carryAmount(): number;
    targetRoom(): string;
    homeRoom(): string;
    moveToTargetRoom(): void;
    isInRoom(room: string): boolean;
    isInTargetRoom(): boolean;
    isInHomeRoom(): boolean;
    moveToRoom(room: string): number;
}
