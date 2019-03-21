import {Tree_Core_Tick} from "./Tick";
import {Tree_Tree} from "../Tree";
import {TREE_RUNNING} from "../../Constants";
import {Util_Logger} from "../../Util/Logger";

export abstract class Tree_Core_BaseNode {

    protected id: string;

    public abstract assignId(tree: Tree_Tree): void;

    public execute(tick: Tree_Core_Tick): number {
        tick.enter(this);
        this.enter(tick);

        if (!tick.blackboard.get("is_open", tick.tree.id, this.id)) {
            tick.blackboard.set("is_open", true, tick.tree.id, this.id);
            this.open(tick);
        }

        tick.beforeTick(this);
        const status = this.tick(tick);
        tick.afterTick(this, status);

        if (status !== TREE_RUNNING) {
            tick.blackboard.set("is_open", false, tick.tree.id, this.id);
            this.close(tick);
        }

        tick.exit(this);
        this.exit(tick);

        return status;
    }

    public getDescription(tick: Tree_Core_Tick): string {
        Util_Logger.warn("Missing method getDescription() in " + this.constructor.name);
        return this.constructor.name;
    }

    protected enter(tick: Tree_Core_Tick): void {
        // override to use
    }

    protected open(tick: Tree_Core_Tick): void {
        // override to use
    }

    protected tick(tick: Tree_Core_Tick): number {
        throw new Error("tick method must be implemented");
    }

    protected close(tick: Tree_Core_Tick): void {
        // override to use
    }

    protected exit(tick: Tree_Core_Tick): void {
        // override to use
    }
}
