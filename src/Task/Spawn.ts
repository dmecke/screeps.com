import {Task_Task} from "./Task";
import {Settings} from "../Settings";
import {Role_Role} from "../Role/Role";
import {Role_Factory} from "../Role/Factory";
import {ROLE_BUILDER, ROLE_CLAIMER, ROLE_SCOUT} from "../Constants";
import CreepNameGenerator from "../Util/CreepNameGenerator";
import SpawnRepository from "../Repository/SpawnRepository";

export class Task_Spawn extends Task_Task {

    private readonly spawnRepository: SpawnRepository;
    private readonly creepNameGenerator: CreepNameGenerator;

    public constructor(
        spawnRepository: SpawnRepository,
        creepNameGenerator: CreepNameGenerator,
    ) {
        super();
        this.spawnRepository = spawnRepository;
        this.creepNameGenerator = creepNameGenerator;
    }

    public execute() {
        this.spawnRepository.findAll().forEach((spawn: StructureSpawn) => {
            this.spawnInSpawner(spawn);
        });
    }

    private spawnInSpawner(spawn: StructureSpawn): void {
        for (const role of Role_Factory.roles()) {
            if (role === ROLE_CLAIMER) {
                continue;
            }
            if (spawn.room.creepsOfRole(role).length < Role_Factory.minimumCreepCount(role)) {
                this.spawn(role, spawn);
                return;
            }
        }

        if (Settings.WISHLIST_ROOMS.length > 0 && spawn.room.creepsOfRole(ROLE_CLAIMER).length < 2) {
            this.spawn(ROLE_CLAIMER, spawn, Settings.WISHLIST_ROOMS[Math.floor(Math.random() * Settings.WISHLIST_ROOMS.length)]);
            return;
        }

        if (spawn.room.creepsOfRole(ROLE_BUILDER).length < Settings.BUILDER_MAXIMUM) {
            this.spawn(ROLE_BUILDER, spawn);
            return;
        }
    }

    private spawn(role: string, spawn: StructureSpawn, targetRoom: string = ""): string|number {
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
        }

        return newName;
    }
}
