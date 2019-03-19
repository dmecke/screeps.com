import { Task_Task } from "./Task";

export class Task_Cleanup extends Task_Task {
    public execute() {
        for (const name in Memory.creeps) {
            if (!Game.creeps[name]) {
                delete Memory.creeps[name];
            }
        }
    }
}
