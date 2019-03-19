import {Role_Role} from "./Role";
import {Tree_Tree} from "../Tree/Tree";
import tree = require("./HarvesterTree");

/**
 * harvests energy from a source and builds a container next to it if it does not yet exist
 */
export class Role_Harvester extends Role_Role {

    public static bodyParts(energyCapacityAvailable: number): BodyPartConstant[] {
        if (energyCapacityAvailable < 550) {
            return [WORK, WORK, CARRY, MOVE];
        } else {
            return [WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE];
        }
    }

    public name(): string {
        return "Harvester";
    }

    public tree(): Tree_Tree {
        return tree;
    }
}
