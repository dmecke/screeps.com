import {Settings} from "../../Settings";

export class Sources implements ISources {

    private sources: Source[];

    public constructor(sources: Source[] = []) {
        this.sources = sources;
    }

    public withContainer(): Sources {
        return new Sources(
            _.filter(this.sources, function(source: Source) {
                return source.pos.findInRange(FIND_STRUCTURES, Settings.BUILD_DISTANCE_CONTAINER, {
                    filter: (structure: Structure) => structure.structureType === STRUCTURE_CONTAINER,
                }).length > 0
            }),
        );
    }

    public withoutHarvester(): Sources {
        return new Sources(
            _.filter(this.sources, function(source: Source) {
                return true; // @todo
            }),
        )
    }

    public orderByPriority(creep: Creep): Sources {
        let sources = this.sources;
        sources.sort((a: Source, b: Source): number => b.priority(creep) - a.priority(creep));

        return new Sources(sources);
    }

    public closestByPath(pos: RoomPosition): Source {
        return pos.findClosestByPath(this.sources);
    }

    public first(): Source {
        return this.sources[0];
    }
}
