import {Tree_Tree} from "../Tree/Tree";
import {Role_Role} from "./Role";
import tree = require("./UpgraderTree");

/**
 * upgrades the controller
 */
export class Role_Upgrader extends Role_Role {

    public static bodyParts(energyCapacityAvailable: number): BodyPartConstant[] {
        if (energyCapacityAvailable < 550) {
            return [WORK, CARRY, MOVE, MOVE, MOVE];
        } else {
            return [WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE];
        }
    }

    public name(): string {
        return "Upgrader";
    }

    public tree(): Tree_Tree {
        return tree;
    }
}
