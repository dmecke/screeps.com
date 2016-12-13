let consoleCommands = function() {
    global.foo = function() {
        console.log("foo");
        return "";
    }
};

export = consoleCommands;
