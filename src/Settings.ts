export class Settings {
    public static ROAD_PLANNING_STEP_COUNT = 50;
    public static ROAD_PLANNING_THRESHOLD = 1000;
    public static BUILD_PRIORITY_CONTAINER = 30;
    public static BUILD_PRIORITY_EXTENSION = 25;
    public static BUILD_DISTANCE_CONTAINER = 1; // how far should a container be placed next to a structure?

    public static BLACKLISTED_ROOMS = ["W49N71"];
    public static WISHLIST_ROOMS = ["W46N73"];

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
}
