import { Role_Role } from "../Role/Role";
import { StateMachine_State } from "./State";

export class StateMachine {
    private role: Role_Role;
    constructor(role: Role_Role) {
        this.role = role;
    }
    public update() {
        this.currentState().execute(this.role);
    }
    public changeState(newState: string): void {
        let state = this.role.createState(newState);
        this.role.creep.say(state.toString());

        this.currentState().exit(this.role);
        this.role.creep.memory.state = newState;
        this.currentState().enter(this.role);
    }
    private currentState(): StateMachine_State {
        return this.role.createState(this.role.creep.state());
    }
}
