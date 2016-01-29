//
// Site / View / Main
//

'use strict';

// Dependencies
var log = require('bows')('Main');
var App = require('ampersand-app');
var View = require('ampersand-view');
var Utils = require('../base/utils');



// View
// --------------------------------------------------

var MainView = View.extend({

    props: {
        frameCount: 'number',
    },

    derived: {
    },

    bindings: {
    },

    events: {
    },

    initialize: function() {
        log('initialize()');

        // Bootstrap

        // Init setup
        this._tick();

        // Bindings
    },

    // Event Handlers ----------------

    // Private Methods ----------------

    _tick: function() {
        //log('starting _tick');
        var _this = this;
        var increment = function() {
            _this._tickAction();
            _this.frameCount++;
            Utils.raf(increment);
        };
        increment();
    },

    _tickAction: function() {
        //log('tick: ', this.frameCount);
    },

    // Public Methods ----------------

});



// Exports
// --------------------------------------------------

module.exports = MainView;
