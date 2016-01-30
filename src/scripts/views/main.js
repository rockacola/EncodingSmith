//
// Site / View / Main
//

'use strict';

// Dependencies
var log = require('bows')('Main');
var App = require('ampersand-app');
var View = require('ampersand-view');
var Events = require('ampersand-events');
var Utils = require('../base/utils');
var InputView = require('./input');

var EncodeUri = require('../base/encodeUri');
var EncodeBase64 = require('../base/encodeBase64');
var EncodeEscape = require('../base/encodeEscape');


// View
// --------------------------------------------------

var MainView = View.extend({

    props: {
        frameCount: 'number',
        formBlocks: ['array', true, function () { return []; }],
    },

    derived: {},

    bindings: {},

    events: {},

    initialize: function () {
        log('initialize()');

        // Bootstrap
        this.formBlocks = [
            { type: 'plain-text',   view: new InputView({el: this.el.querySelector('[data-hook="input--plain-text"]')}) },
            { type: 'base64',       view: new InputView({el: this.el.querySelector('[data-hook="input--base64"]'), algorithm: EncodeBase64}) },
            { type: 'url',          view: new InputView({el: this.el.querySelector('[data-hook="input--url"]'), algorithm: EncodeUri}) },
            { type: 'escape',       view: new InputView({el: this.el.querySelector('[data-hook="input--escape"]'), algorithm: EncodeEscape }) },
        ];

        // Init setup
        //this._tick();

        // Bindings
        Events.on('input:changed', this._inputChangedHandler.bind(this));
    },

    // Event Handlers ----------------

    _inputChangedHandler: function (type, decodedValue) {
        log('_inputChangedHandler triggered. type:', type);
        if (type != 'plain-text') {
            var plainTextFormItem = Utils.find(this.formBlocks, {type: 'plain-text'});
            //log('formItem:', formItem);
            plainTextFormItem.view.SetValue(decodedValue);
        }

        //TODO: improve iteration to ignore the 'triggered encode type'.
        Utils.forEach(this.formBlocks, function (formItem) {
            if (formItem.type != 'plain-text') {
                formItem.view.EncodeAndSetValue(decodedValue);
            }
        });
    },

    // Private Methods ----------------

    //_tick: function() {
    //    //log('starting _tick');
    //    var _this = this;
    //    var increment = function() {
    //        _this._tickAction();
    //        _this.frameCount++;
    //        Utils.raf(increment);
    //    };
    //    increment();
    //},
    //
    //_tickAction: function() {
    //    //log('tick: ', this.frameCount);
    //},

    // Public Methods ----------------

});


// Exports
// --------------------------------------------------

module.exports = MainView;
