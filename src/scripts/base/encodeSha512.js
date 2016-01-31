//
// Site / Base / Encode SHA512
//

'use strict';

// Dependencies
var log = require('bows')('Encode SHA512');
var SHA512 = require('sha.js')('sha512');


// App Initialization
// --------------------------------------------------

var Encode = {
    encode: function (value) {
        return SHA512.update(value, 'utf8').digest('hex');
    },

    decode: function (value) {
        return null;
    },
};


// Exports
// --------------------------------------------------

module.exports = Encode;
