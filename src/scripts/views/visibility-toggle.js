//
// Site / View / Visibility Toggle
//

'use strict';

// Dependencies
var log = require('bows')('Visibility Toggle');
//var App = require('ampersand-app');
var View = require('ampersand-view');
var Events = require('ampersand-events');
//var Utils = require('../base/utils');


// View
// --------------------------------------------------

var VisibilityToggleView = View.extend({

    template: '<li><button></button></li>',

    render: function() {
        // Bootstrap
        this.renderWithTemplate(this);

        return this;
    },

    props: {
        type: 'string',
        enabled: 'boolean',
        $button: 'element',
    },

    derived: {
    },

    bindings: {
        'enabled': {
            type: 'booleanClass',
            name: 'is-active'
        }
    },

    events: {
        'click button': '_buttonClickHandler',
    },

    initialize: function () {
        //log('initialize()');

        // Bootstrap
        this.render();

        // Init setup
        this.$button = this.el.querySelector('button');
        this.$button.innerHTML = this.type;
        this.$button.setAttribute('data-type', this.type);
        this.enabled = true;

        // Bindings
    },

    // Event Handlers ----------------

    _buttonClickHandler: function(e) {
        //log('_buttonClickHandler triggered');
        this.enabled = !this.enabled;
        Events.trigger('input:visibility-changed', this.type, this.enabled);
    },

    // Private Methods ----------------

    // Public Methods ----------------

});


// Exports
// --------------------------------------------------

module.exports = VisibilityToggleView;
