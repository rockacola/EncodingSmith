//
// Site / Base / Encode SHA256
//

'use strict';

// Dependencies
var log = require('bows')('Encode SHA256');
var SHA256 = require('sha.js')('sha256');


// App Initialization
// --------------------------------------------------

var Encode = {
    encode: function (value) {
        return SHA256.update(value, 'utf8').digest('hex');
    },

    decode: function (value) {
        return null;
    },
};


// Exports
// --------------------------------------------------

module.exports = Encode;
