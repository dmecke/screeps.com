export class Settings {
    public static ROAD_PLANNING_STEP_COUNT = 50;
    public static ROAD_PLANNING_THRESHOLD = 1000;
    public static BUILD_PRIORITY_SPAWN = 50;
    public static BUILD_PRIORITY_CONTAINER = 30;
    public static BUILD_PRIORITY_EXTENSION = 25;
    public static BUILD_DISTANCE_CONTAINER = 1; // how far should a container be placed next to a structure?

    public static BLACKLISTED_ROOMS = [];
    public static WISHLIST_ROOMS = ["E27N24", "E28N25"];

    public static NUMBER_OF_HARVESTER = 4;
    public static NUMBER_OF_UPGRADER = 1;
    public static NUMBER_OF_TRANSPORTER = 4;
    public static NUMBER_OF_SPAWN_SUPPLIER = 3;
    public static NUMBER_OF_WALLIE = 2;
    public static NUMBER_OF_DEFENDER = 0;
    public static NUMBER_OF_SCOUT = 1;
    public static NUMBER_OF_CLAIMER = 0;
    public static NUMBER_OF_BUILDER = 1;
    public static BUILDER_MAXIMUM = 5;

    public static AVERAGE_TICK_DURATION = 2.9; // @todo calculate this: store the current timestamp every x ticks and compare how much time has passed

    public static CPU_BUCKET_MAXIMUM = 10000;
    public static CPU_BUCKET_BUFFER = 500;
}
