import {Task_Task} from "./Task";
import {Settings} from "../Settings";
import {Role_Role} from "../Role/Role";
import {Role_Factory} from "../Role/Factory";
import {ROLE_BUILDER, ROLE_CLAIMER, ROLE_SCOUT} from "../Constants";
import CreepNameGenerator from "../Util/CreepNameGenerator";
import SpawnRepository from "../Repository/SpawnRepository";
import RoomRepository from "../Repository/RoomRepository";

export class Task_Spawn extends Task_Task {

    private readonly spawnRepository: SpawnRepository;
    private readonly roomRepository: RoomRepository;
    private readonly creepNameGenerator: CreepNameGenerator;

    public constructor(
        spawnRepository: SpawnRepository,
        roomRepository: RoomRepository,
        creepNameGenerator: CreepNameGenerator,
    ) {
        super();
        this.spawnRepository = spawnRepository;
        this.roomRepository = roomRepository;
        this.creepNameGenerator = creepNameGenerator;
    }

    public execute() {
        this.spawnRepository.findAll().forEach((spawn: StructureSpawn) => {
            this.spawnInSpawner(spawn);
        });
    }

    private spawnInSpawner(spawn: StructureSpawn): void {
        const role = spawn.room.findNextRoleToSpawn();
        if (role !== null) {
            if (this.spawn(role, spawn)) {
                return;
            }
        }

        const undevelopedRooms = this.roomRepository.findUndeveloped();
        if (undevelopedRooms.length > 0) {
            if (this.spawn(ROLE_BUILDER, spawn, undevelopedRooms[0].name)) {
                return;
            }
        }

        if (Settings.WISHLIST_ROOMS.length > 0 && spawn.room.creepsOfRole(ROLE_CLAIMER).length < 1) {
            if (this.spawn(ROLE_CLAIMER, spawn, Settings.WISHLIST_ROOMS[Math.floor(Math.random() * Settings.WISHLIST_ROOMS.length)])) {
                return;
            }
        }

        if (spawn.room.creepsOfRole(ROLE_BUILDER).length < Settings.BUILDER_MAXIMUM) {
             if (this.spawn(ROLE_BUILDER, spawn)) {
                 return;
             }
        }
    }

    private spawn(role: string, spawn: StructureSpawn, targetRoom: string = ""): boolean {
        const newName = spawn.createCreep(Role_Factory.bodyParts(role, spawn), this.creepNameGenerator.generate(role), {
            blackboard: {},
            blacklisted_rooms: Settings.BLACKLISTED_ROOMS,
            debug: false,
            experimental: false,
            home_room: spawn.room.name,
            role,
            target_room: targetRoom ? targetRoom : spawn.room.name,
        });
        if (!Number(newName)) {
            const creep = Game.creeps[newName];
            const r = creep.role() as Role_Role;
            const roleName = r.name();
            if (roleName === ROLE_SCOUT) {
                creep.notifyWhenAttacked(false);
            }

            return true;
        }

        return false;
    }
}
