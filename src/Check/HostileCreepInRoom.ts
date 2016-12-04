import {Tree_Core_Action} from "../Tree/Core/Action";
import {Settings} from "../Settings";

export class Check_HostileCreepInRoom extends Tree_Core_Action {

    private room: Room;

    public constructor(room: Room) {
        super();
        this.room = room;
    }

    public tick(): number {
        let hostileCreeps = this.room.find(FIND_HOSTILE_CREEPS);

        if (hostileCreeps.length > 0) {
            return Settings.TREE_SUCCESS;
        }

        return Settings.TREE_FAILURE;
    }
}
