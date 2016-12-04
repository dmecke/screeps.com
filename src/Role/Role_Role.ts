import {Tree_Tree} from "../Tree/Tree_Tree";

export abstract class Role_Role {

    protected creep: Creep;

    public constructor(creep: Creep) {
        this.creep = creep;
    }

    public abstract name(): string;

    public abstract tree(): Tree_Tree;
}
