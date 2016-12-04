import {Tree_Core_Action} from "../Tree/Core/Action";
import {Settings} from "../Settings";

export class Check_RoomHasStructure extends Tree_Core_Action {

    private room: Room;

    private structure: string;

    public constructor(room: Room, structure: string) {
        super();
        this.room = room;
        this.structure = structure;
    }

    public tick(): number {
        let structures = this.room.find(FIND_STRUCTURES, {
            filter: (structure: Structure) => structure.structureType === this.structure,
        }).length;

        if (structures > 0) {
            return Settings.TREE_SUCCESS;
        }

        return Settings.TREE_FAILURE;
    }
}
