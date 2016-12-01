import {Settings} from "../Settings";
import {Util_Logger} from "../Util/Logger";

let loadStructurePrototype = function() {
    Structure.prototype.hasCloseContainer = function(this: Structure): boolean
    {
        let hasStructure = this.pos.findInRange(FIND_STRUCTURES, Settings.BUILD_DISTANCE_CONTAINER, {
            filter: (structure: Structure) => structure.structureType === STRUCTURE_CONTAINER,
        }).length > 0;

        let hasConstructionSite = this.pos.findInRange(FIND_CONSTRUCTION_SITES, Settings.BUILD_DISTANCE_CONTAINER, {
            filter: (constructionSite: ConstructionSite) => constructionSite.structureType === STRUCTURE_CONTAINER,
        }).length > 0;

        return hasStructure || hasConstructionSite;
    };

    Structure.prototype.buildCloseContainer = function(this: Structure): void
    {
        let positions = this.pos.outerPositionsInRange(Settings.BUILD_DISTANCE_CONTAINER);
        let position = this.pos.findClosestByPath(positions);
        position.createConstructionSite(STRUCTURE_CONTAINER);

        Util_Logger.info("Added container construction site at " + position.x + "|" + position.y + ".");
    };
};

export = loadStructurePrototype;
