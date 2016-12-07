import {Tree_Tree} from "../Tree/Tree_Tree";
import {Role_Role} from "./Role";
import tree = require("./TransporterTree");

/**
 * transports harvested energy to containers
 */
export class Role_Transporter extends Role_Role {

    public static bodyParts(energyCapacityAvailable: number): string[] {
        if (energyCapacityAvailable < 550) {
            return [CARRY, CARRY, CARRY, MOVE, MOVE, MOVE];
        } else {
            return [CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE];
        }
    }

    public name(): string {
        return "Transporter";
    }

    public tree(): Tree_Tree {
        return tree;
    }
}
