import {Task_Task} from "./Task";
import {Util_Logger} from "../Util/Logger";
import {Role_Factory} from "../Role/Factory";

export class Task_Report extends Task_Task {

    private rooms: Room[] = [];

    public execute(): void {
        Util_Logger.info("");
        Util_Logger.info("=== <span style='color: #5599e6'>Report</span> " + Game.time.toString().format() + " ===");

        for (const name in Game.rooms) {
            if (Game.rooms.hasOwnProperty(name)) {
                if (this.needToReport(Game.rooms[name])) {
                    this.rooms.push(Game.rooms[name]);
                }
            }
        }

        this.orderRooms();

        const message: string[] = [];
        for (const role of Role_Factory.roles()) {
            if (Role_Factory.isRoomIndependant(role)) {
                const color = this.rooms[0].creepsOfRole(role).length >= Role_Factory.minimumCreepCount(role) ? "#79CB44" : "#ff5646";
                message.push(role + " <span style='color:" + color + "'>" + this.rooms[0].creepsOfRole(role).length + " / " + Role_Factory.minimumCreepCount(role) + "</span>");
            }
        }
        Util_Logger.info(message.join("  |  "));

        for (const room of this.rooms) {
            this.logStatistics(room);
        }
    }

    private needToReport(room: Room): boolean {
        if (room.controller === undefined) {
            return false;
        }

        if (!room.controller.my) {
            return false;
        }

        return true;
    }

    private orderRooms(): void {
        // @todo order rooms from east to west (and if equal from north to south)
    }

    private logStatistics(room: Room): void {
        const attack = room.find(FIND_HOSTILE_CREEPS).length > 0 ? "<span style='color: #ff5646'>!!!</span>" : "   ";
        const message: string[] = [];
        for (const role of Role_Factory.roles()) {
            if (!Role_Factory.isRoomIndependant(role)) {
                const color = room.creepsOfRole(role).length >= Role_Factory.minimumCreepCount(role) ? "#79CB44" : "#ff5646";
                message.push(role + " <span style='color:" + color + "'>" + room.creepsOfRole(role).length + " / " + Role_Factory.minimumCreepCount(role) + "</span>");
            }
        }
        Util_Logger.info(room.name + ": " + attack + " " + this.getLevelReport(room) + "  |  " + this.getEnergyReport(room) + "  |  " + message.join("  |  "));
    }

    private getLevelReport(room: Room): string {
        this.trackControllerProgress(room);
        const formattedProgress = room.controller.progress.toString().format();
        const formattedProgressTotal = room.controller.progressTotal.toString().format();
        const stack = room.memory.progress_stack;
        const change = stack.slice(-1).pop() - stack[0];

        return "RCL " + room.controller.level + "  " + formattedProgress.pad(10) + " / " + formattedProgressTotal.pad(10) + " " + ("(+" + change.toString().format() + ")").pad(8);
    }

    private trackControllerProgress(room: Room): void {
        const stack = room.memory.progress_stack || [];
        stack.push(room.controller.progress);
        if (stack.length > 1000) {
            stack.shift();
        }
        room.memory.progress_stack = stack;
    }

    private getEnergyReport(room: Room): string {
        const color = room.energyAvailable === room.energyCapacityAvailable ? "#79CB44" : "#ffd85b";
        const available = room.energyAvailable.toString();
        const capacity = room.energyCapacityAvailable.toString();

        return "Energy <span style='color: " + color + "'>" + available.pad(4) + " / " + capacity.pad(4) + "</span>";
    }
}
