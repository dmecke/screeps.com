export abstract class Tree_Core_BaseNode {
    public execute() {
        this.enter();
        let status = this.tick();
        this.exit();

        return status;
    }

    public enter(): void {
        // override to use
    }

    public tick(): number {
        throw new Error("tick method must be implemented");
    }

    public exit(): void {
        // override to use
    }
}
