import {Tree_Tree} from "../Tree/Tree_Tree";
import {Role_Role} from "./Role";
import tree = require("./ClaimerTree");

/**
 * @todo currently the target_room needs to be assigned manually
 */
export class Role_Claimer extends Role_Role {

    public static bodyParts(energyCapacityAvailable: number): string[] {
        if (energyCapacityAvailable < 1300) {
            return [CLAIM, MOVE];
        } else {
            return [CLAIM, CLAIM, MOVE, MOVE];
        }
    }

    public name(): string {
        return "Claimer";
    }

    public tree(): Tree_Tree {
        return tree;
    }
}
