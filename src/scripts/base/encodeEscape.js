//
// Site / Base / Encode Escape
//

'use strict';

// Dependencies
var log = require('bows')('Encode Escape');


// App Initialization
// --------------------------------------------------


var Encode = {
    encode: function (value) {
        /*global escape */
        return escape(value);
    },

    decode: function (value) {
        /*global unescape */
        return unescape(value);
    },
};


// Exports
// --------------------------------------------------

module.exports = Encode;
