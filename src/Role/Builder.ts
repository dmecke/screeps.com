import {Tree_Tree} from "../Tree/Tree";
import {Role_Role} from "./Role";
import tree = require("./BuilderTree");

/**
 * repairs and builds structures; helps with upgrading when nothing to do
 */
export class Role_Builder extends Role_Role {

    public static bodyParts(energyCapacityAvailable: number): BodyPartConstant[] {
        if (energyCapacityAvailable < 550) {
            return [WORK, CARRY, MOVE, MOVE, MOVE];
        } else {
            return [WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE];
        }
    }

    public name(): string {
        return "Builder";
    }

    public tree(): Tree_Tree {
        return tree;
    }
}
