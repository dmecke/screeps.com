import {Tree_Tree} from "../Tree/Tree";
import {Role_Role} from "./Role";
import tree = require("./SpawnSupplierTree");

/**
 * supplys spawn points and extensions with energy
 */
export class Role_SpawnSupplier extends Role_Role {

    public static bodyParts(energyCapacityAvailable: number): BodyPartConstant[] {
        if (energyCapacityAvailable < 550) {
            return [WORK, CARRY, CARRY, MOVE, MOVE];
        } else {
            return [WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE];
        }
    }

    public name(): string {
        return "SpawnSupplier";
    }

    public tree(): Tree_Tree {
        return tree;
    }
}
