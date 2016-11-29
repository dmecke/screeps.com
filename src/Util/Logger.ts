export class Util_Logger {
    public static debug(message: string) {
        console.log("        " + message);
    }
    public static info(message: string) {
        console.log("[INFO]  " + message);
    }
    public static warn(message: string) {
        console.log("[WARN]  " + message);
    }
    public static error(message: string) {
        console.log("===");
        console.log("[ERROR] " + message);
        console.log("===");
    }
}
