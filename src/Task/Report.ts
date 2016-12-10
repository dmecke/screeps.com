import {Task_Task} from "./Task";
import {Util_Logger} from "../Util/Logger";
import {Task_Spawn} from "./Spawn";

export class Task_Report extends Task_Task {

    private static SIMULATION_ROOM = "sim";

    public execute(): void {
        Util_Logger.info("");
        let tick = Game.rooms[Task_Report.SIMULATION_ROOM] ? " " + Game.time : "";
        Util_Logger.info("=== <span style='color: #5599e6'>Report</span>" + tick + " ===");

        for (let name in Game.rooms) {
            if (Game.rooms.hasOwnProperty(name)) {
                this.handleRoom(Game.rooms[name]);
            }
        }
    }

    private handleRoom(room: Room): void {
        if (room.controller === undefined) {
            return;
        }

        if (!room.controller.my) {
            return;
        }

        this.logStatistics(room);
    }

    // @todo order rooms from east to west (and if equal from north to south)
    // @todo show global creep counts separated from rooms (in a general statistics row above the room statistics)
    private logStatistics(room: Room): void {
        let message: string[] = [];
        for (let role of Task_Spawn.roles()) {
            let color = room.creepsOfRole(role).length >= Task_Spawn.minimumCreepCount(role) ? "#79CB44" : "#ff5646";
            message.push(role + " <span style='color:" + color + "'>" + room.creepsOfRole(role).length + " / " + Task_Spawn.minimumCreepCount(role) + "</span>");
        }
        Util_Logger.info(room.name + ": " + this.getLevelReport(room) + "  |  " + this.getEnergyReport(room) + "  |  " + message.join("  |  "));
    }

    private getLevelReport(room: Room): string {
        this.trackControllerProgress(room);
        let formattedProgress = room.controller.progress.toString().numberFormat(0, ",", ".");
        let formattedProgressTotal = room.controller.progressTotal.toString().numberFormat(0, ",", ".");
        let stack = room.memory.progress_stack;
        let change = stack.slice(-1).pop() - stack[0];

        return "RCL " + room.controller.level + "  " + formattedProgress.pad(10) + " / " + formattedProgressTotal.pad(10) + " " + ("(+" + change.toString().numberFormat(0, ",", ".") + ")").pad(8);
    }

    private trackControllerProgress(room: Room): void {
        let stack = room.memory.progress_stack || [];
        stack.push(room.controller.progress);
        if (stack.length > 1000) {
            stack.shift();
        }
        room.memory.progress_stack = stack;
    }

    private getEnergyReport(room: Room): string {
        let color = room.energyAvailable === room.energyCapacityAvailable ? "#79CB44" : "#ffd85b";
        let available = room.energyAvailable.toString();
        let capacity = room.energyCapacityAvailable.toString();

        return "Energy <span style='color: " + color + "'>" + available.pad(4) + " / " + capacity.pad(4) + "</span>";
    }
}
