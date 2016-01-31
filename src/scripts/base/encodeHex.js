//
// Site / Base / Encode Hex
//

'use strict';

// Dependencies
var log = require('bows')('Encode Hex');



// App Initialization
// --------------------------------------------------

// REF: http://www.java2s.com/Code/JavaScript/Security/AsciitoHexandHextoAsciiinJavaScript.htm
//      http://www.java2s.com/Code/JavaScriptDemo/AsciitoHexandHextoAsciiinJavaScript.htm
var Encode = {
    _hex : "0123456789abcdef",
    _almost_ascii : ' !"#$%&'+"'"+'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ['+'\\'+']^_`abcdefghijklmnopqrstuvwxyz{|}',

    encode: function (input) {
        var output = "";

        for(var i=0; i<input.length; i++) {
            var let1 = input.charAt(i);
            var pos = this._almost_ascii.indexOf(let1) + 32;
            var h16 = Math.floor(pos/16);
            var h1 = pos % 16;
            output += this._hex.charAt(h16) + this._hex.charAt(h1);
        }

        return output;
    },

    decode: function (input) {
        var output = "";

        for(var i=0; i<input.length; i++) {
            var let1 = input.charAt(2 * i);
            var let2 = input.charAt(2 * i + 1);
            var val = this._hex.indexOf(let1) * 16 + this._hex.indexOf(let2);
            output += this._almost_ascii.charAt(val - 32);
        }

        return output;
    },
};


// Exports
// --------------------------------------------------

module.exports = Encode;
