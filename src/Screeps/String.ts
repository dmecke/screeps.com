let loadStringPrototype = function() {
    String.prototype.format = function(this: String) {
        return this.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    };

    String.prototype.pad = function(this: String, length: number, padString: string = " ") {
        let padding = "";
        for (let i = 0; i < length; i++) {
            padding += padString;
        }

        return padding.substring(0, length - this.length) + this;
    };
};

export = loadStringPrototype;
