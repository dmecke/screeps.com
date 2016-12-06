import {Settings} from "../Settings";
import {Util_Logger} from "../Util/Logger";

let loadRoomPositionPrototype = function() {

    RoomPosition.prototype.positionsInRange = function(this: RoomPosition, range: number): RoomPosition[]
    {
        let positions: RoomPosition[] = [];
        for (let x = -range; x <= range; x++) {
            for (let y = -range; y <= range; y++) {
                let position = new RoomPosition(this.x + x, this.y + y, this.roomName);
                positions.push(position);
            }
        }

        return positions;
    };

    RoomPosition.prototype.outerPositionsInRange = function(this: RoomPosition, range: number): RoomPosition[]
    {
        let self = this;
        return _.filter(this.positionsInRange(range), function(position: RoomPosition) {
            return self.getRangeTo(position) === range && ["plain", "swamp"].indexOf(Game.map.getTerrainAt(position)) !== -1;
        });
    };

    RoomPosition.prototype.hasCloseContainer = function(this: RoomPosition): boolean
    {
        let hasStructure = this.findInRange(FIND_STRUCTURES, Settings.BUILD_DISTANCE_CONTAINER, {
            filter: (structure: Structure) => structure.structureType === STRUCTURE_CONTAINER,
        }).length > 0;

        let hasConstructionSite = this.findInRange(FIND_CONSTRUCTION_SITES, Settings.BUILD_DISTANCE_CONTAINER, {
            filter: (constructionSite: ConstructionSite) => constructionSite.structureType === STRUCTURE_CONTAINER,
        }).length > 0;

        return hasStructure || hasConstructionSite;
    };

    RoomPosition.prototype.createCloseContainerConstructionSite = function(this: RoomPosition): number
    {
        let positions = this.outerPositionsInRange(Settings.BUILD_DISTANCE_CONTAINER);
        let position = this.findClosestByPath(positions);
        if (null === position) {
            Util_Logger.warn("Could not find a position to build a container near " + this.x + "|" + this.y + " in " + this.roomName + ".");
            return ERR_INVALID_TARGET;
        }

        let status = position.createConstructionSite(STRUCTURE_CONTAINER);
        if (status > 0) {
            Util_Logger.info("Added container construction site at " + position.x + "|" + position.y + " in " + position.roomName + ".");
        }

        return status;
    };
};

export = loadRoomPositionPrototype;
