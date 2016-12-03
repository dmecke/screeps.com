import {Tree_Core_Tick} from "./Tick";

export abstract class Tree_Core_BaseNode {

    public execute(tick: Tree_Core_Tick) {
        tick.enter(this);
        this.enter(tick);

        tick.beforeTick(this);
        let status = this.tick(tick);
        tick.afterTick(this, status);

        tick.exit(this);
        this.exit(tick);

        return status;
    }

    protected enter(tick: Tree_Core_Tick): void {
        // override to use
    }

    protected tick(tick: Tree_Core_Tick): number {
        throw new Error("tick method must be implemented");
    }

    protected exit(tick: Tree_Core_Tick): void {
        // override to use
    }
}
