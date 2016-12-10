import {Settings} from "../../Settings";

export class ConstructionSites implements IConstructionSites {

    private constructionSites: ConstructionSite[];

    public constructor(constructionSites: ConstructionSite[] = []) {
        this.constructionSites = constructionSites;
    }

    public orderByPriority(creep: Creep): ConstructionSites {
        let constructionSites = this.constructionSites;
        constructionSites.sort((a: ConstructionSite, b: ConstructionSite) => {
            let prioA = a.pos.getRangeTo(creep);
            prioA -= a.structureType === STRUCTURE_CONTAINER ? Settings.BUILD_PRIORITY_CONTAINER : 0;
            prioA -= a.structureType === STRUCTURE_EXTENSION ? Settings.BUILD_PRIORITY_EXTENSION : 0;

            let prioB = b.pos.getRangeTo(creep);
            prioB -= b.structureType === STRUCTURE_CONTAINER ? Settings.BUILD_PRIORITY_CONTAINER : 0;
            prioB -= b.structureType === STRUCTURE_EXTENSION ? Settings.BUILD_PRIORITY_EXTENSION : 0;

            return prioA - prioB;
        });

        return new ConstructionSites(constructionSites);
    }

    public closestByPath(pos: RoomPosition): ConstructionSite {
        return pos.findClosestByPath(this.constructionSites);
    }

    public first(): ConstructionSite {
        return this.constructionSites[0];
    }
}
