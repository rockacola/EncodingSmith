//
// Site / View / Input
//

'use strict';

// Dependencies
var log = require('bows')('Input');
//var App = require('ampersand-app');
var View = require('ampersand-view');
var Events = require('ampersand-events');
var Utils = require('../base/utils');


// View
// --------------------------------------------------

var InputView = View.extend({

    props: {
        algorithm: 'object',
        type: 'string',
        allowDecode: 'boolean',
        enabled: 'boolean',
        previousValue: ['string', true, ''],
        $textArea: 'element',
    },

    bindings: {
        'enabled': {
            type: 'booleanClass',
            name: 'is-active'
        },
    },

    events: {
        'focus textarea': '_textAreaFocusHandler',
        'focusout textarea': '_textAreaFocusOutHandler',
    },

    initialize: function () {
        //log('initialize()');

        // Bootstrap
        this.$textArea = this.el.querySelector('textarea');
        this.type = this.el.getAttribute('data-encode-type');

        // Init setup
        this.enabled = true;
        if(!this.allowDecode) {
            this.el.classList.add('is-disabled');
            this.$textArea.disabled = true;
        }

        // Bindings
    },

    // Event Handlers ----------------

    _textAreaFocusHandler: function (e) {
        //log('_textAreaClickHandler triggered');
        this.el.classList.add('is-focused');
    },

    _textAreaFocusOutHandler: function (e) {
        //log('_textAreaFocusOutHandler triggered');
        this.el.classList.remove('is-focused');
        //recalculate 'plain text', and in turn recalculate all other encodes
        if (this.$textArea.value != this.previousValue) {
            //log('new value:', this.$textArea.value);
            this.previousValue = this.$textArea.value;
            var decodedValue = this._decodeContent();
            Events.trigger('input:content-changed', this.type, decodedValue);
        }
    },

    // Private Methods ----------------

    _decodeContent: function () {
        var value = this.$textArea.value;
        if (!this.algorithm) {
            log('[INFO]', 'This is no algorithm available for this input view, passing back original value');
            return value;
        }
        return this.algorithm.decode(value);
    },

    // Public Methods ----------------

    SetValue: function (value) {
        this.$textArea.value = value;
    },

    EncodeAndSetValue: function (rawValue) {
        //TODO: algorithm exception handling
        this.$textArea.value = this.algorithm.encode(rawValue);
    },

    SetEnabled: function(enabled) {
        this.enabled = enabled;
    }
});


// Exports
// --------------------------------------------------

module.exports = InputView;
