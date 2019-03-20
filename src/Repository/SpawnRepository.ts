export default class SpawnRepository {

    public findAll(): StructureSpawn[] {
        const spawns = [];
        for (const spawnName in Game.spawns) {
            if (Game.spawns.hasOwnProperty(spawnName)) {
                spawns.push(Game.spawns[spawnName]);
            }
        }

        return spawns;
    }
}
