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



// App Initialization
// --------------------------------------------------

var TheInstance = window.App = window.App || {

        isDebug: false, // Whether the application is run in debug mode
        //clickOrTouch: 'click',
        encodings: [ //NOTE: Accumulate this list for available encoding methods
            { type: 'hex',      name: 'Hexdecimal Encode',          allowDecode: true,  algorithm: require('./base/encodeHex') },
            { type: 'base64',   name: 'Base64 Encode',              allowDecode: true,  algorithm: require('./base/encodeBase64') },
            { type: 'url',      name: 'URL Encode',                 allowDecode: true,  algorithm: require('./base/encodeUri') },
            { type: 'escape',   name: 'Special Character Escape',   allowDecode: true,  algorithm: require('./base/encodeEscape') },
            { type: 'md5',      name: 'MD5 Checksum',               allowDecode: false, algorithm: require('./base/encodeMd5') },
            { type: 'sha1',     name: 'SHA-1 Checksum',             allowDecode: false, algorithm: require('./base/encodeSha1') },
            { type: 'sha256',   name: 'SHA-256 Checksum',           allowDecode: false, algorithm: require('./base/encodeSha256') },
            { type: 'sha512',   name: 'SHA-512 Checksum',           allowDecode: false, algorithm: require('./base/encodeSha512') },
        ],

        init: function () {
            log('TheInstance.init()');

            //-- Init
            var baseInstance = this;
            document.body.setAttribute('data-debug', baseInstance.isDebug);
            //baseInstance.clickOrTouch = ('ontouchend' in window) ? 'touchend' : 'click';

            //-- View
            baseInstance.view = new MainView({el: document.querySelector('[data-hook="outline"]'), encodings: baseInstance.encodings});
        }
    };

App.extend(TheInstance); // use Ampersand-App for better singleton usage.
App.init();
