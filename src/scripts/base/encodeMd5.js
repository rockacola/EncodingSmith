//
// Site / Base / Encode MD5
//

'use strict';

// Dependencies
var log = require('bows')('Encode MD5');
var MD5 = require('md5');


// App Initialization
// --------------------------------------------------

var Encode = {
    encode: function (value) {
        return MD5(value);
    },

    decode: function (value) {
        return null;
    },
};


// Exports
// --------------------------------------------------

module.exports = Encode;
