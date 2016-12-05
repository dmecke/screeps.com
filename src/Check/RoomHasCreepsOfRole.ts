import {Tree_Core_Action} from "../Tree/Core/Action";
import {Settings} from "../Settings";
import {Tree_Core_Tick} from "../Tree/Core/Tick";
import {Role_Role} from "../Role/Role";

export class Check_RoomHasCreepsOfRole extends Tree_Core_Action {

    private role: string;

    private amount: number;

    public constructor(role: string, amount: number) {
        super();
        this.role = role;
        this.amount = amount;
    }

    public tick(tick: Tree_Core_Tick): number {
        let creep = tick.target as Creep;

        let creeps = creep.room.find(FIND_MY_CREEPS, {
            filter: (c: Creep) => {
                let role = c.role() as Role_Role;

                return role.name() === this.role;
            },
        }).length;

        if (creeps >= this.amount) {
            return Settings.TREE_SUCCESS;
        }

        return Settings.TREE_FAILURE;
    }
}
