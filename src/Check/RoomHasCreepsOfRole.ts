import {Tree_Core_Action} from "../Tree/Core/Action";
import {Settings} from "../Settings";

export class Check_RoomHasCreepsOfRole extends Tree_Core_Action {

    private room: Room;

    private role: string;

    private amount: number;

    public constructor(room: Room, role: string, amount: number) {
        super();
        this.room = room;
        this.role = role;
        this.amount = amount;
    }

    public tick(): number {
        let creeps = this.room.find(FIND_MY_CREEPS, {
            filter: (creep: Creep) => creep.role() === this.role,
        }).length;

        if (creeps >= this.amount) {
            return Settings.TREE_SUCCESS;
        }

        return Settings.TREE_FAILURE;
    }
}
