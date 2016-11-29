import { Role_Role } from "../Role/Role";

export abstract class StateMachine_State {
    public enter(role: Role_Role): void {
        // override if needed
    }
    public exit(role: Role_Role): void {
        // override if needed
    }
    public execute(role: Role_Role): void {
        // override if needed
    }
}
