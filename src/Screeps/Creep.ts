import {Util_Logger} from "../Util/Logger";
import {Role_Harvester} from "../Role/Harvester";
import {Role_Builder} from "../Role/Builder";
import {Role_Upgrader} from "../Role/Upgrader";
import {Role_Transporter} from "../Role/Transporter";
import {Role_SpawnSupplier} from "../Role/SpawnSupplier";
import {Role_Wallie} from "../Role/Wallie";
import {Role_Defender} from "../Role/Defender";
import {Role_Scout} from "../Role/Scout";
import {Role_Role} from "../Role/Role";
import {Role_Claimer} from "../Role/Claimer";
import {ROLE_HARVESTER, ROLE_BUILDER, ROLE_UPGRADER, ROLE_TRANSPORTER, ROLE_SPAWN_SUPPLIER, ROLE_WALLIE, ROLE_DEFENDER, ROLE_SCOUT, ROLE_CLAIMER} from "../Constants";

let loadCreepPrototype = () => {

    Creep.prototype.role = function(this: Creep): Role_Role {
        switch (this.memory.role) {
            case ROLE_HARVESTER:
                return new Role_Harvester(this);

            case ROLE_BUILDER:
                return new Role_Builder(this);

            case ROLE_UPGRADER:
                return new Role_Upgrader(this);

            case ROLE_TRANSPORTER:
                return new Role_Transporter(this);

            case ROLE_SPAWN_SUPPLIER:
                return new Role_SpawnSupplier(this);

            case ROLE_WALLIE:
                return new Role_Wallie(this);

            case ROLE_DEFENDER:
                return new Role_Defender(this);

            case ROLE_SCOUT:
                return new Role_Scout(this);

            case ROLE_CLAIMER:
                return new Role_Claimer(this);

            default:
                Util_Logger.error(this.name + " has an invalid role: '" + this.memory.role + "'");
                throw new Error();
        }
    };

    Creep.prototype.debug = function(this: Creep): boolean {
        return this.memory.debug;
    };

    Creep.prototype.blacklistedRooms = function(this: Creep): string[] {
        return this.memory.blacklisted_rooms;
    };

    Creep.prototype.carryAmount = function(this: Creep): number {
        return _.sum(this.carry);
    };

    Creep.prototype.homeRoom = function(this: Creep): string {
        return this.memory.home_room;
    };

    Creep.prototype.targetRoom = function(this: Creep): string {
        return this.memory.target_room;
    };

    Creep.prototype.isInRoom = function(this: Creep, room: string): boolean {
        return this.room.name === room;
    };

    Creep.prototype.moveToRoom = function(this: Creep, room: string): number {
        return this.moveTo(new RoomPosition(25, 25, room));
    };
};

export = loadCreepPrototype;
