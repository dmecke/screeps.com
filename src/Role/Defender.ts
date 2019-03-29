import {Tree_Tree} from "../Tree/Tree";
import {Role_Role} from "./Role";
import tree = require("./DefenderTree");

export class Role_Defender extends Role_Role {

    public static bodyParts(energyCapacityAvailable: number): BodyPartConstant[] {
        if (energyCapacityAvailable < 550) {
            return [ATTACK, TOUGH, MOVE, MOVE];
        } else {
            return [ATTACK, RANGED_ATTACK, TOUGH, TOUGH, MOVE, MOVE];
        }
    }

    public name(): string {
        return "Defender";
    }

    public tree(): Tree_Tree {
        return tree;
    }
}
