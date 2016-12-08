import {Tree_Tree} from "../Tree/Tree_Tree";
import {Role_Role} from "./Role";
import tree = require("./DefenderTree");

export class Role_Defender extends Role_Role {

    public static bodyParts(energyCapacityAvailable: number): string[] {
        if (energyCapacityAvailable < 550) {
            return [ATTACK, ATTACK, MOVE, MOVE];
        } else {
            return [ATTACK, RANGED_ATTACK, RANGED_ATTACK, MOVE, MOVE, MOVE];
        }
    }

    public name(): string {
        return "Defender";
    }

    public tree(): Tree_Tree {
        return tree;
    }
}
