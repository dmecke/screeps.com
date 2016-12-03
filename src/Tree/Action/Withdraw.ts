import {Tree_Core_Action} from "../Core/Action";
import {Settings} from "../../Settings";

export class Tree_Action_Withdraw extends Tree_Core_Action {

    private creep: Creep;

    private target: Structure;

    private resource: string;

    public constructor(creep: Creep, target: Structure, resource: string) {
        super();
        this.creep = creep;
        this.target = target;
        this.resource = resource;
    }

    public tick(): number {
        if (this.creep.withdraw(this.target, this.resource) === OK) {
            return Settings.TREE_SUCCESS;
        }

        return Settings.TREE_FAILURE;
    }
}
