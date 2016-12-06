export class Tree_Core_Blackboard {

    private holder: Creep|StructureTower;

    public constructor(creep: Creep|StructureTower) {
        this.holder = creep;
    }

    public set(key: string, value: any, treeId: string = "", nodeId: string = ""): void {
        if (!this.holder.memory.hasOwnProperty("blackboard")) {
            this.holder.memory.blackboard = {};
        }
        this.holder.memory.blackboard[treeId + "|" + nodeId + "|" + key] = value;
    }

    public get(key: string, treeId: string = "", nodeId: string = ""): any {
        if (!this.holder.memory.hasOwnProperty("blackboard")) {
            this.holder.memory.blackboard = {};
        }
        return this.holder.memory.blackboard[treeId + "|" + nodeId + "|" + key];
    }
}
