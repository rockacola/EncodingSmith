//
// Site / Base / Encode URI
//

'use strict';

// Dependencies
var log = require('bows')('Encode URI');


// App Initialization
// --------------------------------------------------

var Encode = {
    encode: function (value) {
        return encodeURI(value);
    },

    decode: function (value) {
        return decodeURI(value);
    },
};


// Exports
// --------------------------------------------------

module.exports = Encode;
