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

var EncodeUri = require('../base/encodeUri');
var EncodeBase64 = require('../base/encodeBase64');
var EncodeEscape = require('../base/encodeEscape');
var EncodeMd5 = require('../base/encodeMd5');


// View
// --------------------------------------------------

var MainView = View.extend({

    props: {
        frameCount: 'number',
        formBlocks: ['array', true, function () { return []; }],

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

        var encodings = [
            { type: 'base64',   name: 'Base64 Encode',              allowDecode: true,  algorithm: EncodeBase64 },
            { type: 'url',      name: 'URL Encode',                 allowDecode: true,  algorithm: EncodeUri },
            { type: 'escape',   name: 'Special Character Escape',   allowDecode: true,  algorithm: EncodeEscape },
            { type: 'md5',      name: 'MD5 Checksum',               allowDecode: false, algorithm: EncodeMd5 },
        ];

        // Init setup
        this.formBlocks = [
            { type: 'plain-text', view: new InputView({el: this.el.querySelector('[data-hook="input--plain-text"]'), type: 'plain-text', name: 'Plain TextX', allowDecode: true}) },
        ];
        //this.formBlocks[0].view.render();

        Utils.forEach(encodings, function(encoding) {
            var block = { type: encoding.type, view: new InputView({type: encoding.type, name: encoding.name, allowDecode: encoding.allowDecode, algorithm: encoding.algorithm}) };
            _this.$encodingsContainer.appendChild(block.view.el);
            _this.formBlocks.push(block);
        });

        Utils.forEach(this.formBlocks, function(formBlock) {
            if(formBlock.type != 'plain-text') {
                var view = new VisibilityToggleView({ type: formBlock.type });
                _this.$visibilityToggles.appendChild(view.el);
                _this.visibilityToggles.push(view);
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
            var plainTextFormItem = Utils.find(this.formBlocks, {type: 'plain-text'});
            plainTextFormItem.view.SetValue(decodedValue);
        }

        //TODO: improve iteration to ignore the 'triggered encode type'.
        Utils.forEach(this.formBlocks, function (formItem) {
            if (formItem.type != 'plain-text') {
                formItem.view.EncodeAndSetValue(decodedValue);
            }
        });
    },

    _inputVisibilityChangedHandler: function(type, isEnabled) {
        //log('_inputVisibilityChangedHandler triggered. type:', type, 'isEnabled:', isEnabled);
        var formItem = Utils.find(this.formBlocks, {type: type});
        formItem.view.SetEnabled(isEnabled);
    }

    // Private Methods ----------------

    // Public Methods ----------------

});


// Exports
// --------------------------------------------------

module.exports = MainView;
