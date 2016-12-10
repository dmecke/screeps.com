import {Tree_Tree} from "../Tree/Tree";
import {Role_Role} from "./Role";
import tree = require("./ScoutTree");

/**
 * Moves from room to room and updates room informations in the memory.
 */
export class Role_Scout extends Role_Role {

    public static bodyParts(energyCapacityAvailable: number): string[] {
        if (energyCapacityAvailable < 550) {
            return [MOVE, MOVE, MOVE, MOVE, MOVE, MOVE];
        } else {
            return [MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE];
        }
    }

    public name(): string {
        return "Scout";
    }

    public tree(): Tree_Tree {
        return tree;
    }
}
