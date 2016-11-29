export abstract class Action_Action {
    protected creep: Creep;
    constructor(creep: Creep) {
        this.creep = creep;
    }
    public abstract execute(target: RoomObject): void;
}
