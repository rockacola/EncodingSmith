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

    template: '<div class="form-block form-block--encode">' +
                '<label>[Label]</label>' +
                '<textarea class="input"></textarea>' +
              '</div>',

    render: function() {
        this.renderWithTemplate(this);
        return this;
    },

    props: {
        algorithm: 'object',
        type: 'string',
        name: 'string',
        allowDecode: 'boolean',
        enabled: 'boolean',
        previousValue: ['string', true, ''],
        $textArea: 'element',
        $label: 'element',
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
        log('initialize(), type:', this.type);

        // Bootstrap
        if(!this.el) { // Check if parent supplies el property
            this.render();
        }

        // Init setup
        this.$textArea = this.el.querySelector('textarea');
        this.$label = this.el.querySelector('label');

        this.el.classList.add('form-block--' + this.type);
        this.el.setAttribute('data-hook', 'input--' + this.type);
        this.el.setAttribute('data-encode-type', this.type);
        this.$label.innerHTML = this.name; //TODO

        this.enabled = true;
        if(!this.allowDecode) {
            this.el.classList.add('is-disabled');
            this.$textArea.disabled = true;
        }

        // Bindings
    },

    // Event Handlers ----------------

    _textAreaFocusHandler: function (e) {
        //log('_textAreaFocusHandler triggered');
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
