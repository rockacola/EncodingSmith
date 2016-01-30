//
// Site / Base / Base64
//

'use strict';

// Dependencies
var log = require('bows')('EncodeBase64');
var Base64 = require('js-base64').Base64;



// App Initialization
// --------------------------------------------------

var Encode = {
    encode: function(value) {
        log('hello. value:', value, 'al:', Base64);
        return Base64.encode(value);
    },

    decode: function(value) {
        return Base64.decode(value);
    },
};



// Exports
// --------------------------------------------------

module.exports = Encode;
