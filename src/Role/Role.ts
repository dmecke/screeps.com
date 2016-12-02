import { StateMachine_State } from "../StateMachine/State";
import { StateMachine } from "../StateMachine/StateMachine";

export abstract class Role_Role {
    public creep: Creep;
    public stateMachine: StateMachine;
    constructor(creep: Creep) {
        this.creep = creep;
        this.stateMachine = new StateMachine(this);
    }
    public update(): void {
        this.creep.room.trackInfo();
        this.stateMachine.update();
    }
    public abstract createState(state: string): StateMachine_State;
}
