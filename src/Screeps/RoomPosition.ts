import {Settings} from "../Settings";
import {Util_Logger} from "../Util/Logger";

const loadRoomPositionPrototype = () => {

    RoomPosition.prototype.positionsInRange = function(this: RoomPosition, range: number): RoomPosition[] {
        const positions: RoomPosition[] = [];
        for (let x = -range; x <= range; x++) {
            for (let y = -range; y <= range; y++) {
                const position = new RoomPosition(this.x + x, this.y + y, this.roomName);
                positions.push(position);
            }
        }

        return positions;
    };

    RoomPosition.prototype.outerPositionsInRange = function(this: RoomPosition, range: number): RoomPosition[] {
        const self = this;
        return _.filter(this.positionsInRange(range), (position: RoomPosition) => {
            return self.getRangeTo(position) === range && [0, TERRAIN_MASK_SWAMP].indexOf(Game.map.getRoomTerrain(position.roomName).get(position.x, position.y)) !== -1;
        });
    };

    RoomPosition.prototype.hasCloseContainer = function(this: RoomPosition): boolean {
        const hasStructure = this.findInRange(FIND_STRUCTURES, Settings.BUILD_DISTANCE_CONTAINER, {
            filter: (structure: Structure) => structure.structureType === STRUCTURE_CONTAINER,
        }).length > 0;

        const hasConstructionSite = this.findInRange(FIND_CONSTRUCTION_SITES, Settings.BUILD_DISTANCE_CONTAINER, {
            filter: (constructionSite: ConstructionSite) => constructionSite.structureType === STRUCTURE_CONTAINER,
        }).length > 0;

        return hasStructure || hasConstructionSite;
    };

    RoomPosition.prototype.createCloseContainerConstructionSite = function(this: RoomPosition): number {
        const positions = this.outerPositionsInRange(Settings.BUILD_DISTANCE_CONTAINER);
        const position = this.findClosestByPath(positions);
        if (null === position) {
            Util_Logger.warn("Could not find a position to build a container near " + this.x + "|" + this.y + " in " + this.roomName + ".");
            return ERR_INVALID_TARGET;
        }

        const status = position.createConstructionSite(STRUCTURE_CONTAINER);
        if (status > 0) {
            Util_Logger.info("Added container construction site at " + position.x + "|" + position.y + " in " + position.roomName + ".");
        }

        return status;
    };

    RoomPosition.prototype.canStepOn = function(this: RoomPosition): boolean {
        if (this.lookFor(LOOK_CREEPS).length > 0) {
            return false;
        }
        const unwalkableStructures = this.lookFor(LOOK_STRUCTURES)
          .filter(structure => structure.structureType !== STRUCTURE_RAMPART);
        if (unwalkableStructures.length > 0) {
            return false;
        }

        return true;
    };

    RoomPosition.prototype.toString = function(this: RoomPosition): string {
        return this.roomName + "|" + this.x + "|" + this.y;
    };
};

export = loadRoomPositionPrototype;
