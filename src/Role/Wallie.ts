import {Tree_Tree} from "../Tree/Tree";
import {Role_Role} from "./Role";
import tree = require("./WallieTree");

/**
 * repairs walls and ramparts
 */
export class Role_Wallie extends Role_Role {

    public static bodyParts(energyCapacityAvailable: number): string[] {
        if (energyCapacityAvailable < 550) {
            return [WORK, CARRY, MOVE, MOVE];
        } else {
            return [WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE];
        }
    }

    public name(): string {
        return "Wallie";
    }

    public tree(): Tree_Tree {
        return tree;
    }
}
