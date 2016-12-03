import {Tree_Core_Action} from "../Core/Action";
import {Tree_Tree} from "../Tree_Tree";

export class Tree_Action_CreepIsAtCarryAmount extends Tree_Core_Action {

    private creep: Creep;

    private amount: number;

    public constructor(creep: Creep, amount: number) {
        super();
        this.creep = creep;
        this.amount = amount;
    }

    public tick(): number {
        if (this.creep.carryAmount() === this.amount) {
            return Tree_Tree.SUCCESS;
        } else {
            return Tree_Tree.FAILURE;
        }
    }
}
