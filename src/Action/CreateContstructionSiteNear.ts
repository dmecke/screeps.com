import {Tree_Core_Action} from "../Tree/Core/Action";
import {Settings} from "../Settings";

export class Action_CreateConstructionSiteNear extends Tree_Core_Action {

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
        let status = this.position.createCloseContainerConstructionSite();

        if (status === OK) {
            return Settings.TREE_SUCCESS;
        }

        return Settings.TREE_FAILURE;
    }
}
