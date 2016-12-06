interface RoomPosition {
    positionsInRange(range: number): RoomPosition[];
    outerPositionsInRange(range: number): RoomPosition[];
    hasCloseContainer(): boolean;
    createCloseContainerConstructionSite(): number;
}
interface Room {
    hasController(): boolean;
    findSourcesByPriority(creep: Creep): Array<Source>;
    findConstructionSitesByPriority(creep: Creep): Array<ConstructionSite>;
    findDamagedStructuresByPriority(creep: Creep): Array<Structure>;
    findDamagedWallsByPriority(): Array<StructureWall|StructureRampart>;
    findNearestDroppedEnergy(creep: Creep): Array<Resource>;
    findFilledStorages(): Array<StructureStorage|StructureContainer>;
    findSpawnsInNeedOfEnergy(): Array<StructureSpawn|StructureExtension|StructureContainer>;
    findNearestSpawnInNeedOfEnergy(creep: Creep): StructureSpawn|StructureExtension|StructureContainer;
    findRandomAdjacentRoom(): string;
    amountOfDroppedEnergy(): number;
    trackInfo(): void;
}
interface Source {
    priority(creep: Creep): number;
    harvestingSpots(): RoomPosition[];
    attachedContainer(): Container;
    hasAttachedContainer(): boolean;
}
interface Creep {
    role(): Object;
    debug(): boolean;
    state(): string;
    carryAmount(): number;
    targetRoom(): string;
    homeRoom(): string;
    moveToTargetRoom(): void;
    isInRoom(room: string): boolean;
    isInTargetRoom(): boolean;
    isInHomeRoom(): boolean;
    moveToRoom(room: string): number;
    findNearestFilledStorage(): StructureStorage|StructureContainer;
    findNearestUnfilledStorage(): StructureStorage|StructureContainer;
}
