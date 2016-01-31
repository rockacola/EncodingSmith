//
// Site / App
//

'use strict';

// Dependencies
//NOTE: Browser may needs to run "localStorage.debug=true" to have bows showing up in console.
var log = require('bows')('App');
var App = require('ampersand-app');
var MainView = require('./views/main');
//var Utils = require('./base/utils');

var EncodeUri = require('./base/encodeUri');
var EncodeBase64 = require('./base/encodeBase64');
var EncodeEscape = require('./base/encodeEscape');
var EncodeMd5 = require('./base/encodeMd5');


// App Initialization
// --------------------------------------------------

var TheInstance = window.App = window.App || {

        isDebug: true, // Whether the application is run in debug mode
        clickOrTouch: 'click',
        encodings: [ //NOTE: Accumulate this list for available encoding methods
            { type: 'base64',   name: 'Base64 Encode',              allowDecode: true,  algorithm: EncodeBase64 },
            { type: 'url',      name: 'URL Encode',                 allowDecode: true,  algorithm: EncodeUri },
            { type: 'escape',   name: 'Special Character Escape',   allowDecode: true,  algorithm: EncodeEscape },
            { type: 'md5',      name: 'MD5 Checksum',               allowDecode: false, algorithm: EncodeMd5 },
        ],

        init: function () {
            log('TheInstance.init()');

            //-- Init
            var baseInstance = this;
            document.body.setAttribute('data-debug', baseInstance.isDebug);
            baseInstance.clickOrTouch = ('ontouchend' in window) ? 'touchend' : 'click';

            //-- View
            baseInstance.view = new MainView({el: document.querySelector('[data-hook="outline"]'), encodings: baseInstance.encodings});
        }
    };

App.extend(TheInstance); // use Ampersand-App for better singleton usage.
App.init();
