import {Task_Task} from "./Task";
import {Settings} from "../Settings";
import {Role_Role} from "../Role/Role";
import {Role_Factory} from "../Role/Factory";

export class Task_Spawn extends Task_Task {

    public execute() {
        for (let spawnName in Game.spawns) {
            if (Game.spawns.hasOwnProperty(spawnName)) {
                let spawned = false;
                let spawn = Game.spawns[spawnName];
                if (Settings.WISHLIST_ROOMS.length > 0 && spawn.room.creepsOfRole(Settings.ROLE_CLAIMER).length < 2) {
                    this.spawn(Settings.ROLE_CLAIMER, spawnName, Settings.WISHLIST_ROOMS[0]); // @todo handle all wishlist rooms, not just the first
                }
                for (let role of Role_Factory.roles()) {
                    if (spawn.room.creepsOfRole(role).length < Role_Factory.minimumCreepCount(role)) {
                        this.spawn(role, spawnName);
                        spawned = true;
                    }
                }
                if (!spawned && spawn.room.creepsOfRole(Settings.ROLE_BUILDER).length < Settings.BUILDER_MAXIMUM) {
                    this.spawn(Settings.ROLE_BUILDER, spawnName);
                }
            }
        }
    }

    private spawn(role: string, spawnName: string, targetRoom: string = ""): string|number {
        let spawn = Game.spawns[spawnName];
        let newName = spawn.createCreep(Role_Factory.bodyParts(role, spawn), undefined, {
            blackboard: {},
            blacklisted_rooms: Settings.BLACKLISTED_ROOMS,
            debug: false,
            experimental: false,
            home_room: spawn.room.name,
            role,
            target_room: targetRoom ? targetRoom : spawn.room.name,
        });
        if (!Number(newName)) {
            let creep = Game.creeps[newName];
            let r = creep.role() as Role_Role;
            let roleName = r.name();
            if (roleName === Settings.ROLE_SCOUT) {
                creep.notifyWhenAttacked(false);
            }
        }

        return newName;
    }
}
