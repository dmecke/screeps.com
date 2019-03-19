import {Tree_Core_Action} from "../Tree/Core/Action";
import {TREE_SUCCESS, TREE_FAILURE} from "../Constants";

export class Check_RoomHasStructure extends Tree_Core_Action {

    private room: Room;

    private structure: string;

    public constructor(room: Room, structure: string) {
        super();
        this.room = room;
        this.structure = structure;
    }

    public tick(): number {
        const structures = this.room.find(FIND_STRUCTURES, {
            filter: (structure: Structure) => structure.structureType === this.structure,
        }).length;

        if (structures > 0) {
            return TREE_SUCCESS;
        }

        return TREE_FAILURE;
    }
}
