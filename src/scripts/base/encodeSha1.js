//
// Site / Base / Encode SHA1
//

'use strict';

// Dependencies
var log = require('bows')('Encode SHA1');
var SHA1 = require('sha1');


// App Initialization
// --------------------------------------------------

var Encode = {
    encode: function (value) {
        return SHA1(value);
    },

    decode: function (value) {
        return null;
    },
};


// Exports
// --------------------------------------------------

module.exports = Encode;
