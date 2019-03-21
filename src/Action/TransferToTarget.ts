import {Tree_Core_Action} from "../Tree/Core/Action";
import {Tree_Core_Tick} from "../Tree/Core/Tick";
import {TREE_SUCCESS, TREE_FAILURE} from "../Constants";

export class Action_TransferToTarget extends Tree_Core_Action {

    private readonly resource: ResourceConstant;

    public constructor(resource: ResourceConstant) {
        super();
        this.resource = resource;
    }

    public tick(tick: Tree_Core_Tick): number {
        const creep = tick.target as Creep;
        const target = this.getTarget(tick);

        if (creep.transfer(target, this.resource) === OK) {
            return TREE_SUCCESS;
        }

        return TREE_FAILURE;
    }

    public getDescription(tick: Tree_Core_Tick): string {
        const creep = tick.target as Creep;
        const amount = creep.carry[this.resource];
        const roomPosition = this.getTarget(tick).pos;

        return "I try to transfer all of my " + amount + " " + this.resource + " to my target at " + roomPosition.x + "|" + roomPosition.y + ".";
    }

    private getTarget(tick: Tree_Core_Tick): Creep|StructureSpawn|Structure {
        return tick.blackboard.get("target", tick.tree.id);
    }
}
