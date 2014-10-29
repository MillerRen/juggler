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

    App.module('Demo',function(Demo, App, Backbone, Marionette, $, _){
    	
    	Demo.Layout = Juggler.Views.Layout.extend({
    		template:_.template('<div class="col-md-3" data-region="sidebar"></div>\
    		<div class="col-md-9" data-region="content"></div>')
    	});
    
    	Demo.on('start',function(){
    		var layout = new Demo.Layout();
    		Juggler.mainRegion.show(layout);
    		var navbar = new Juggler.Widgets.Navbar({
    			collection:new Demo.Enities.Navs
    		});
    		Juggler.headerRegion.show(navbar);
    	});
    
    });
    
    App.module('Demo.Enities',function(Enities, App, Backbone, Marionette, $, _){
    
    	Enities.Navs = Juggler.Enities.Collection.extend({
    		initialize:function(){
    			this.reset([
    				{name:'Docs',value:'docs'},
    				{name:'Examples',value:'examples'}
    			]);
    		}
    	});
    
    });
    
	
	App.addInitializer(function(){
		
	});
	
	
    
    return App;

}));
