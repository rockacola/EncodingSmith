//
// Site / View / Main
//

'use strict';

// Dependencies
var log = require('bows')('Main');
var App = require('ampersand-app');
var View = require('ampersand-view');
var Utils = require('../base/utils');
var InputView = require('./input');



// View
// --------------------------------------------------

var MainView = View.extend({

    props: {
        frameCount: 'number',

        plainTextFormBlock: 'object',
        base64FormBlock: 'object',
        urlFormBlock: 'object',
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
        this.plainTextFormBlock = new InputView({ el: this.el.querySelector('[data-hook="input--plain-text"]') });
        this.base64FormBlock = new InputView({ el: this.el.querySelector('[data-hook="input--base64"]') });
        this.urlFormBlock = new InputView({ el: this.el.querySelector('[data-hook="input--url"]') });

        log('this:', this);

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
