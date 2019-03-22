import {Task_Task} from "./Task";
import {Util_Logger} from "../Util/Logger";
import {Role_Factory} from "../Role/Factory";
import {Settings} from "../Settings";

export class Task_Report extends Task_Task {

    private rooms: Room[] = [];

    public execute(): void {
        Util_Logger.info("");
        Util_Logger.info("=== <span style='color: #5599e6'>Report</span> " + Game.time.toString().format() + " ===");

        this.reportCpu();

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

    private reportCpu(): void {
        const used = Math.floor(Game.cpu.getUsed());
        const cpuColor = used > Game.cpu.limit ? "#ff5646" : "#79CB44";
        const cpuLimitColor = Game.cpu.tickLimit < Settings.CPU_BUCKET_BUFFER ? "#ffd85b" : "#79CB44";
        const cpuReport = "CPU <span style='color: " + cpuColor + "'>" + used.toString().format() + "</span> / <span style='color: " + cpuLimitColor + "'>" + Game.cpu.tickLimit + "</span>";

        const bucket = Game.cpu.bucket;
        const bucketColor = bucket === Settings.CPU_BUCKET_MAXIMUM ? "#79CB44" : "#FF5646";
        const bucketReport = "CPU Bucket <span style='color: " + bucketColor + "'>" + bucket + "</span> / " + Settings.CPU_BUCKET_MAXIMUM.toString().format();

        Util_Logger.info(cpuReport + "  |  " + bucketReport);
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
        Util_Logger.info(room.name + "  |  " + attack + "  |  " + this.getLevelReport(room) + "  |  " + message.join("  |  "));
    }

    private getLevelReport(room: Room): string {
        this.trackControllerProgress(room);

        const roomControlLevel = "RCL " + room.controller.level;
        const formattedProgress = room.controller.progress.toString().format().pad(10);
        const formattedProgressTotal = room.controller.progressTotal.toString().format().pad(10);
        const energyChange = ("(+" + this.getEnergyChange(room).toString().format() + ")").pad(8);
        const energyReport = this.getEnergyReport(room);
        const estimatedUpgradeTime = this.getEstimatedUpgradeTime(room);

        return roomControlLevel + "  |  " + formattedProgress + " / " + formattedProgressTotal + "  |  " + energyChange + "  |  " + energyReport + "  |  " + estimatedUpgradeTime;
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

    private getEstimatedUpgradeTime(room: Room): string {
        const energyPerSecond = this.getEnergyChange(room) / room.memory.progress_stack.length / Settings.AVERAGE_TICK_DURATION;
        const neededEnergyToUpgrade = room.controller.progressTotal - room.controller.progress;
        let secondsToUpgrade = Math.floor(neededEnergyToUpgrade / energyPerSecond);

        const hoursToUpgrade = Math.floor(secondsToUpgrade / 3600);
        secondsToUpgrade -= hoursToUpgrade * 3600;

        const minutesToUpgrade = Math.floor(secondsToUpgrade / 60);
        secondsToUpgrade -= minutesToUpgrade * 60;

        const nextUpgrade = hoursToUpgrade.toString().pad(2, "0") + ":" + minutesToUpgrade.toString().pad(2, "0") + ":" + secondsToUpgrade.toString().pad(2, "0");

        return "Next Upgrade <span style='color: #79CB44'>" + nextUpgrade + "</span>";
    }

    private getEnergyChange(room: Room): number {
        const stack = room.memory.progress_stack;

        return stack.slice(-1).pop() - stack[0];
    }
}
