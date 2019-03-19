import {Tree_Core_Action} from "../Tree/Core/Action";
import {Tree_Core_Tick} from "../Tree/Core/Tick";
import {Role_Role} from "../Role/Role";
import {TREE_SUCCESS, TREE_FAILURE} from "../Constants";

export class Check_RoomHasCreepsOfRole extends Tree_Core_Action {

    private readonly role: string;

    private readonly amount: number;

    public constructor(role: string, amount: number) {
        super();
        this.role = role;
        this.amount = amount;
    }

    public tick(tick: Tree_Core_Tick): number {
        const creep = tick.target as Creep;

        const creeps = creep.room.find(FIND_MY_CREEPS, {
            filter: (c: Creep) => {
                const role = c.role() as Role_Role;

                return role.name() === this.role;
            },
        }).length;

        if (creeps >= this.amount) {
            return TREE_SUCCESS;
        }

        return TREE_FAILURE;
    }
}
