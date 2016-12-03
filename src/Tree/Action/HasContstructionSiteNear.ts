import {Tree_Core_Action} from "../Core/Action";
import {Tree_Tree} from "../Tree_Tree";

export class Tree_Action_HasConstructionSiteNear extends Tree_Core_Action {

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
            return Tree_Tree.SUCCESS;
        }

        return Tree_Tree.FAILURE;
    }
}
