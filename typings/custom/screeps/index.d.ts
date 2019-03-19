interface IStructures {
    none(): boolean;
    exist(): boolean;
    notWall(): IStructures;
    notRampart(): IStructures;
    whichHaveNotMaxHitpoints(): IStructures;
    onlyMine(): IStructures;
    notHostile(): IStructures;
    closestByPath(pos: RoomPosition): Structure;
}
interface IConstructionSites {
    orderByPriority(creep: Creep): IConstructionSites;
    closestByPath(pos: RoomPosition): ConstructionSite;
    first(): ConstructionSite;
}
interface ISources {
    withContainer(): ISources;
    withoutHarvester(): ISources;
    orderByPriority(creep: Creep): ISources;
    closestByPath(pos: RoomPosition): Source;
    first(): Source;
}
interface IDepots {
    contains(resource: string): IDepots;
    notFull(): IDepots;
    nextToController(): IDepots;
    nextToSource(): IDepots;
    nextToMySpawn(): IDepots;
    canStore(amount: number): IDepots;
    closestByPath(pos: RoomPosition): StructureContainer|StructureStorage;
}
interface ISpawns {
    inNeedOfEnergy(): ISpawns;
    closestByPath(pos: RoomPosition): StructureSpawn|StructureExtension;
    none(): boolean;
    exist(): boolean;
}
interface ITowers {
    inNeedOfEnergy(): ITowers;
    closestByPath(pos: RoomPosition): StructureTower;
    none(): boolean;
    exist(): boolean;
}
interface IDroppedResources {
    is(resource: string): IDroppedResources;
    closestByPath(pos: RoomPosition): Resource;
    none(): boolean;
    exist(): boolean;
    amount(): number;
}
interface IWallsAndRamparts {
    withNotMaxHitpoints(): IWallsAndRamparts;
    orderByPriority(): IWallsAndRamparts;
    closestByPath(pos: RoomPosition): StructureWall|StructureRampart
    first(): StructureWall|StructureRampart
}

interface RoomPosition {
    positionsInRange(range: number): RoomPosition[];
    outerPositionsInRange(range: number): RoomPosition[];
    hasCloseContainer(): boolean;
    createCloseContainerConstructionSite(): number;
}
interface Room {
    hasController(): boolean;
    findStructures(): IStructures;
    findSources(): ISources;
    findDepots(): IDepots;
    findSpawns(): ISpawns;
    findTowers(): ITowers;
    findDroppedResources(): IDroppedResources;
    findWallsAndRamparts(): IWallsAndRamparts;
    findConstructionSites(): IConstructionSites;
    findRandomAdjacentRoom(): string;
    amountOfDroppedEnergy(): number;
    trackInfo(): void;
    creepsOfRole(roleName: string): Creep[];
}
interface Source {
    priority(creep: Creep): number;
    harvestingSpots(): RoomPosition[];
    attachedContainer(): StructureContainer;
    hasAttachedContainer(): boolean;
}
interface Creep {
    role(): Object;
    debug(): boolean;
    blacklistedRooms(): string[];
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
interface CreepMemory {
    role: string;
    debug: boolean;
    experimental: boolean;
    home_room: string;
    target_room: string;
    blacklisted_rooms: string[];
    blackboard: object;
}
interface RoomMemory {
    info: object;
    roads: object;
    progress_stack: number[];
    towers: object;
}
interface StructureTower {
    name: string;
    memory: any;
    debug(): boolean;
}
interface String {
    format(): string;
    pad(length: number, padString?: string): string;
}
