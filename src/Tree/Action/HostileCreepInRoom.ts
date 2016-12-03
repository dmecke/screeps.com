import {Tree_Core_Action} from "../Core/Action";
import {Tree_Tree} from "../Tree_Tree";

export class Tree_Action_HostileCreepInRoom extends Tree_Core_Action {

    private room: Room;

    public constructor(room: Room) {
        super();
        this.room = room;
    }

    public tick(): number {
        let hostileCreeps = this.room.find(FIND_HOSTILE_CREEPS);

        if (hostileCreeps.length > 0) {
            return Tree_Tree.SUCCESS;
        } else {
            return Tree_Tree.FAILURE;
        }
    }
}
