//
// Site / View / Input
//

'use strict';

// Dependencies
var log = require('bows')('Input');
//var App = require('ampersand-app');
var View = require('ampersand-view');
var Utils = require('../base/utils');



// View
// --------------------------------------------------

var InputView = View.extend({

    props: {
        $textArea: 'element',
    },

    derived: {
    },

    bindings: {
    },

    events: {
        'focus textarea': '_textAreaFocusHandler',
        'focusout textarea': '_textAreaFocusOutHandler',
    },

    initialize: function() {
        log('initialize()');

        // Bootstrap
        this.$textArea = this.el.querySelector('textarea');

        // Init setup

        // Bindings
    },

    // Event Handlers ----------------

    _textAreaFocusHandler: function(e) {
        //log('_textAreaClickHandler triggered');
        this.el.classList.add('is-focused');
    },

    _textAreaFocusOutHandler: function(e) {
        //log('_textAreaFocusOutHandler triggered');
        this.el.classList.remove('is-focused');
    },

    // Private Methods ----------------


    // Public Methods ----------------

});



// Exports
// --------------------------------------------------

module.exports = InputView;
