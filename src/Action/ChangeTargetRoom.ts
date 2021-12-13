import {Tree_Core_Action} from "../Tree/Core/Action";
import {Tree_Core_Tick} from "../Tree/Core/Tick";
import {TREE_SUCCESS} from "../Constants";
import RoomRepository from "../Repository/RoomRepository";

export class Action_ChangeTargetRoom extends Tree_Core_Action {

    private readonly roomRepository: RoomRepository;

    public constructor(roomRepository: RoomRepository) {
        super();
        this.roomRepository = roomRepository;
    }

    public tick(tick: Tree_Core_Tick): number {
        const creep = tick.target as Creep;
        const rooms = this.roomRepository.findWithOwnedController();

        const targetRoom = rooms[Math.floor(Math.random() * rooms.length)];

        creep.updateTargetRoom(targetRoom.name);

        return TREE_SUCCESS;
    }

    public getDescription(tick: Tree_Core_Tick): string {
        return "I change my target room.";
    }
}
