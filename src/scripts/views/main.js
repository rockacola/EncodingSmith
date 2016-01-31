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
var VisibilityToggleView = require('./visibility-toggle');



// View
// --------------------------------------------------

var MainView = View.extend({

    props: {
        //frameCount: 'number',
        encodings: 'array',
        formInputViews: ['array', true, function () { return []; }],

        visibilityToggles: ['array', true, function () { return []; }],
        $visibilityToggles: 'element',
        $encodingsContainer: 'element',
    },

    derived: {
    },

    bindings: {
    },

    events: {
    },

    initialize: function () {
        log('initialize()');

        // Bootstrap
        var _this = this;
        this.$visibilityToggles = this.el.querySelector('[data-hook="visibility-toggles"]');
        this.$encodingsContainer = this.el.querySelector('[data-hook="encodings-container"]');

        // Init setup
        this.formInputViews = [
            new InputView({el: this.el.querySelector('[data-hook="input--plain-text"]'), type: 'plain-text', name: 'Plain TextX', allowDecode: true}),
        ];

        Utils.forEach(this.encodings, function(encoding) {
            var view = new InputView({type: encoding.type, name: encoding.name, allowDecode: encoding.allowDecode, algorithm: encoding.algorithm});
            _this.$encodingsContainer.appendChild(view.el);
            _this.formInputViews.push(view);
        });

        Utils.forEach(this.formInputViews, function(formInputView) {
            if(formInputView.type != 'plain-text') {
                var vtView = new VisibilityToggleView({ type: formInputView.type });
                _this.$visibilityToggles.appendChild(vtView.el);
                _this.visibilityToggles.push(vtView);
            }
        });

        // Bindings
        Events.on('input:content-changed', this._inputContentChangedHandler.bind(this));
        Events.on('input:visibility-changed', this._inputVisibilityChangedHandler.bind(this));
    },

    // Event Handlers ----------------

    _inputContentChangedHandler: function (type, decodedValue) {
        //log('_inputContentChangedHandler triggered. type:', type);
        if (type != 'plain-text') {
            var plainTextFormItem = Utils.find(this.formInputViews, {type: 'plain-text'});
            plainTextFormItem.SetValue(decodedValue);
        }

        //TODO: improve iteration to ignore the 'triggered encode type'.
        Utils.forEach(this.formInputViews, function (formInputView) {
            if (formInputView.type != 'plain-text') {
                formInputView.EncodeAndSetValue(decodedValue);
            }
        });
    },

    _inputVisibilityChangedHandler: function(type, isEnabled) {
        //log('_inputVisibilityChangedHandler triggered. type:', type, 'isEnabled:', isEnabled);
        var formItem = Utils.find(this.formInputViews, {type: type});
        formItem.SetEnabled(isEnabled);
    }

    // Private Methods ----------------

    // Public Methods ----------------

});


// Exports
// --------------------------------------------------

module.exports = MainView;
