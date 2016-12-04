import {Tree_Core_Action} from "../Tree/Core/Action";
import {Settings} from "../Settings";

export class Check_HasConstructionSiteNear extends Tree_Core_Action {

    private position: RoomPosition;

    private structureType: string;

    private range: number;

    public constructor(position: RoomPosition, structureType: string, range: number) {
        super();
        this.position = position;
        this.structureType = structureType;
        this.range = range;
    }

    public tick(): number {
        let constructionSites = _.filter(this.position.findInRange(FIND_CONSTRUCTION_SITES, this.range),
            (constructionSite: ConstructionSite) => constructionSite.structureType === this.structureType,
        );

        if (constructionSites.length > 0) {
            return Settings.TREE_SUCCESS;
        }

        return Settings.TREE_FAILURE;
    }
}
