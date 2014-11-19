(function(root, factory) {
    
    if (typeof define === 'function' && define.amd) {
        define(['Juggler', 'marionette', 'backbone', 'underscore'], function(Juggler, Marionette, Backbone, _) {
            return (root.App = factory(root, Juggler, Marionette, Backbone, _));
        });
    } else if (typeof exports !== 'undefined') {
        var Marionette = require('marionette');
        var Backbone = require('backbone');
        var _ = require('underscore');
        module.exports = factory(root, Juggler, Marionette, Backbone, _);
    } else {
        root.App = factory(root, root.Juggler, root.Marionette, root.Backbone, root._);
    }

}(this, function(root, Juggler, Marionette, Backbone, _) {
    
    'use strict';
    
    var previousApp = root.App;
    
    var App = new Marionette.Application();
    
    App.VERSION = '0.0.1';
    
    App.noConflict = function() {
        root.App = previousApp;
        return this;
    };
    
    
    /*
	 * switch sub module
	 */
    App.startSubApp = function(appName, args) {
        var currentApp = App.module(appName);
		
        if (App.currentApp) {
            App.currentApp.stop();
        }
        
        App.currentApp = currentApp;
        currentApp.start(args);
    };

    // @include ./enities.js

    // @include ./header.js

    // @include ./layout.js

    // @include ./form.js

    // @include ./table.js

    // @include ./nav.js

    // @include ./button.js

    // @include ./dialog.js

    // @include ./demo.js
    
	
	App.addInitializer(function(){
		
	});
	
	
    
    return App;

}));
