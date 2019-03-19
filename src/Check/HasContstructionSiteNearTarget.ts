import {Tree_Core_Action} from "../Tree/Core/Action";
import {Tree_Core_Tick} from "../Tree/Core/Tick";
import {TREE_SUCCESS, TREE_FAILURE} from "../Constants";

export class Check_HasConstructionSiteNearTarget extends Tree_Core_Action {

    private readonly structureType: string;

    private readonly range: number;

    public constructor(structureType: string, range: number) {
        super();
        this.structureType = structureType;
        this.range = range;
    }

    public tick(tick: Tree_Core_Tick): number {
        const target = tick.blackboard.get("target", tick.tree.id) as { pos: RoomPosition };

        const constructionSites = _.filter(target.pos.findInRange(FIND_CONSTRUCTION_SITES, this.range),
            (constructionSite: ConstructionSite) => constructionSite.structureType === this.structureType,
        );

        if (constructionSites.length > 0) {
            return TREE_SUCCESS;
        }

        return TREE_FAILURE;
    }
}
