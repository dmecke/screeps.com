export default class CreepRepository {

    public static findByName(name: string): Creep {
        for (const n in Game.creeps) {
            if (Game.creeps.hasOwnProperty(name) && n === name) {
                return Game.creeps[name];
            }
        }

        throw new Error();
    }
}
