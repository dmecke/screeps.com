export class Util_Logger {
    public static debug(message: string) {
        console.log("        " + message);
    }
    public static info(message: string) {
        console.log(" <span style='color: #5599e6'>[INFO]</span> " + message);
    }
    public static warn(message: string) {
        console.log(" <span style='color: #ffd85b'>[WARN]</span> " + message);
    }
    public static error(message: string) {
        console.log("<span style='color: #ff5646'>[ERROR]</span> " + message);
    }
}
