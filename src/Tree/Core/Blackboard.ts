import {Tree_Core_TreeMemory} from "./TreeMemory";

export class Tree_Core_Blackboard {

    private creep: Creep;
    // private baseMemory: Object = {};
    // private treeMemory: Tree_Core_TreeMemory[] = [];

    public constructor(creep: Creep) {
        this.creep = creep;
        // this.baseMemory = creep.memory.blackboard.base_memory;
        // this.treeMemory = creep.memory.blackboard.tree_memory;
    }

    public set(key: string, value: any, treeId: string = "", nodeId: string = ""): void {
        this.creep.memory.blackboard[treeId + "|" + nodeId + "|" + key] = value;
        // this.getMemory(treeId, nodeId)[key] = value;
        // if (!treeId) {
        //     this.creep.memory.blackboard.base_memory[key] = value;
        // }
        //
        // if (!nodeId) {
        //     if (!this.creep.memory.blackboard.tree_memory[treeId]) {
        //         this.creep.memory.blackboard.tree_memory[treeId] = new Tree_Core_TreeMemory();
        //     }
        //     this.creep.memory.blackboard.tree_memory[treeId][key] = value;
        // }
        //
        // if (!this.creep.memory.blackboard.tree_memory[treeId]) {
        //     this.creep.memory.blackboard.tree_memory[treeId] = new Tree_Core_TreeMemory();
        // }
        // if (!this.creep.memory.blackboard.tree_memory[treeId][nodeId]) {
        //     this.creep.memory.blackboard.tree_memory[treeId][nodeId] = {};
        // }
        // this.creep.memory.blackboard.tree_memory[treeId][nodeId][key] = value;
    }

    public get(key: string, treeId: string = "", nodeId: string = ""): any {
        return this.creep.memory.blackboard[treeId + "|" + nodeId + "|" + key];
        // return this.getMemory(treeId, nodeId)[key];
    }

    private getMemory(treeId: string = null, nodeId: string = null): Object {
        let baseMemory = this.creep.memory.blackboard.base_memory;
        // let baseMemory = this.baseMemory;

        if (!treeId) {
            return baseMemory;
        }

        let treeMemory = this.getTreeMemory(treeId);

        if (!nodeId) {
            return treeMemory;
        }

        return this.getNodeMemory(treeMemory, nodeId);
    }

    private getTreeMemory(treeId: string): Tree_Core_TreeMemory {
        if (!this.creep.memory.blackboard.tree_memory[treeId]) {
        // if (!this.treeMemory[treeId]) {
            this.creep.memory.blackboard.tree_memory[treeId] = new Tree_Core_TreeMemory();
            // this.treeMemory[treeId] = new Tree_Core_TreeMemory();
        }

        return this.creep.memory.blackboard.tree_memory[treeId];
        // return this.treeMemory[treeId];
    }

    private getNodeMemory(treeMemory: Tree_Core_TreeMemory, nodeId: string): Object {
        let nodeMemory = treeMemory.nodeMemory;

        if (!nodeMemory[nodeId]) {
            nodeMemory[nodeId] = {};
        }

        return nodeMemory;
    }
}
