import {Tree_Tree} from "../Tree/Tree_Tree";
import {Role_Role} from "./Role";
import tree = require("./WallieTree");

/**
 * repairs walls and ramparts
 */
export class Role_Wallie extends Role_Role {

    public static bodyParts(energyCapacityAvailable: number): string[] {
        if (energyCapacityAvailable < 550) {
            return [WORK, WORK, CARRY, MOVE];
        } else {
            return [WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE];
        }
    }

    public name(): string {
        return "Wallie";
    }

    public tree(): Tree_Tree {
        return tree;
    }
}
