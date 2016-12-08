export class Tree_Core_Blackboard {

    private creep: Creep;

    public constructor(creep: Creep) {
        this.creep = creep;
    }

    public set(key: string, value: any, treeId: string = "", nodeId: string = ""): void {
        this.creep.memory.blackboard[treeId + "|" + nodeId + "|" + key] = value;
    }

    public get(key: string, treeId: string = "", nodeId: string = ""): any {
        return this.creep.memory.blackboard[treeId + "|" + nodeId + "|" + key];
    }
}
