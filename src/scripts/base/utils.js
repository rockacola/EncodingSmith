//
// Site / Base / Utils
//

'use strict';

// Dependencies
var log = require('bows')('Utils');

// Base
// --------------------------------------------------

var Utils = {

    // Lodash Utils ----------------

    forEach: require('lodash/collection/forEach'),
    //assign: require('lodash/object/assign'),
    //random: require('lodash/number/random'),
    //remove: require('lodash/array/remove'),
    debounce: require('lodash/function/debounce'),
    find: require('lodash/collection/find'),

    // NPM Libraries ----------------

    raf: require('raf'),
    //ua: require('universal-analytics'),
    //xhr: require('xhr'),

    // Misc ----------------
};



// Exports
// --------------------------------------------------

module.exports = Utils;
