let loadStringPrototype = function() {
    String.prototype.numberFormat = function(this: String, decimals: number = 0, decPoint: string = ".", thousandsSep: string = ",") {

        let numberToProcess = parseFloat(this.toString());
        let roundedNumber = Math.round( Math.abs( numberToProcess ) * parseInt("1e" + decimals, 10) ).toString();

        // add zeros to decimalString if number of decimals indicates it
        roundedNumber = (1 > numberToProcess && -1 < numberToProcess && roundedNumber.length <= decimals)
            ? Array(decimals - roundedNumber.length + 1).join("0") + roundedNumber
            : roundedNumber;
        let numbersString = decimals ? roundedNumber.slice(0, decimals * -1) : roundedNumber.slice(0);
        let checknull = parseInt(numbersString, 10) || 0;

        // check if the value is less than one to prepend a 0
        numbersString = (checknull === 0) ? "0" : numbersString;
        let decimalsString = decimals ? roundedNumber.slice(decimals * -1) : "";

        let formattedNumber = "";
        while (numbersString.length > 3) {
            formattedNumber += thousandsSep + numbersString.slice(-3);
            numbersString = numbersString.slice(0, -3);
        }

        return (numberToProcess < 0 ? "-" : "") + numbersString + formattedNumber + (decimalsString ? (decPoint + decimalsString) : "");
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
