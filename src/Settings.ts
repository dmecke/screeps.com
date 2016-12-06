export class Settings {
    public static ROAD_PLANNING_STEP_COUNT = 50;
    public static ROAD_PLANNING_THRESHOLD = 1000;
    public static BUILD_PRIORITY_CONTAINER = 30;
    public static BUILD_PRIORITY_EXTENSION = 25;
    public static BUILD_DISTANCE_CONTAINER = 1; // how far should a container be placed next to a structure?

    public static TREE_SUCCESS = 1;
    public static TREE_FAILURE = 2;
    public static TREE_RUNNING = 3;
    public static TREE_ERROR = 4;

    public static ROLE_HARVESTER = "Harvester";
    public static ROLE_BUILDER = "Builder";
    public static ROLE_DEFENDER = "Defender";
    public static ROLE_SCOUT = "Scout";
    public static ROLE_SPAWN_SUPPLIER = "SpawnSupplier";
    public static ROLE_TRANSPORTER = "Transporter";
    public static ROLE_UPGRADER = "Upgrader";
    public static ROLE_WALLIE = "Wallie";
    public static ROLE_CLAIMER = "Claimer";
}
