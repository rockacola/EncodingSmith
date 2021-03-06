//
// Site / Base / Encode Base64
//

'use strict';

// Dependencies
var log = require('bows')('Encode Base64');
var Base64 = require('js-base64').Base64;


// App Initialization
// --------------------------------------------------

var Encode = {
    encode: function (value) {
        return Base64.encode(value);
    },

    decode: function (value) {
        return Base64.decode(value);
    },
};


// Exports
// --------------------------------------------------

module.exports = Encode;
