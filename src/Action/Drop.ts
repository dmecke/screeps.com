import {Tree_Core_Action} from "../Tree/Core/Action";
import {Settings} from "../Settings";

export class Action_Drop extends Tree_Core_Action {

    private creep: Creep;

    private resource: string;

    public constructor(creep: Creep, resource: string) {
        super();
        this.creep = creep;
        this.resource = resource;
    }

    public tick(): number {
        if (this.creep.drop(this.resource) === OK) {
            return Settings.TREE_SUCCESS;
        }

        return Settings.TREE_FAILURE;
    }
}
