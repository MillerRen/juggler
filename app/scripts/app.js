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

    App.module('Enities',function(Enities, App, Backbone, Marionette, $, _){
    
    	Enities.Navs = Juggler.Enities.Collection.extend({
    		initialize:function(){
    			this.reset([
    				{name:'Docs',label:'docs'},
    				{name:'Examples',label:'examples'}
    			]);
    		}
    	});
    
    	Enities.Breadcrumb = Juggler.Enities.Collection.extend({
    		initialize:function(){
    			this.reset([
    				{name:'Demo',label:'demo'},
    				{name:'Examples',label:'examples'}
    			]);
    		}
    	});
    
    	Enities.Table = Juggler.Enities.Collection.extend({
    		initialize:function(){
    			this.reset([
    				{name:'Demo',label:'demo'},
    				{name:'Examples',label:'examples'}
    			]);
    		}
    	});
    
    	Enities.Form = Juggler.Enities.Form.extend({
    		defaults:{
    			input:'input',
    			textarea:'textarea',
    			select:'2',
    			checkbox:['1','2'],
    			radio:2
    		}
    	});
    
    });

    App.module('Layout',function(Layout, App, Backbone, Marionette, $, _){
    
    	Layout.Page = Juggler.Views.LayoutView.extend({
    		template:_.template('<div class="col-md-3" data-region="sidebar"></div>\
    				<div class="col-md-9" data-region="content"></div>\
    		')
    	});
    
    });
    

    App.module('Demo',function(Demo, App, Backbone, Marionette, $, _){
    
    	Demo.on('start',function(){
    		 window.layout = new Juggler.Widgets.GridLayout({
    			collection:new Juggler.Enities.Collection([
    				{sidebar:{md:{3:'',push:9}},content:{md:{9:'',pull:3}}},
    				{panel:{md:3},form:{md:9}},
    				[{md:3},{md:9}],
    			])
    		});
    		Juggler.mainRegion.show(layout);
    
    		var navbar = new Juggler.Widgets.Navbar({
    			collection:new App.Enities.Navs
    		});
    		Juggler.headerRegion.show(navbar);
    
    		var breadcrumb = new Juggler.Widgets.Breadcrumb({
    			collection:new App.Enities.Breadcrumb()
    		});
    
    		Juggler.navRegion.show(breadcrumb);
    
    		var menu = new Juggler.Widgets.GroupList({
    			collection:new App.Enities.Navs
    		});
    
    		layout.sidebarRegion.show(menu);
    
    		var table = new Juggler.Widgets.Table({
    			collection:new App.Enities.Table,
    			columns:new Juggler.Enities.Collection([{name:'name',label:'名称'},{name:'label',label:'标签'}])
    		});
    
    		layout.contentRegion.show(table);
    
    		var form = new Juggler.Widgets.Form({
    			model:new App.Enities.Form(),
    			collection:new Juggler.Enities.Fields([
    				{name:'input',label:'Input',editor:'input',validator:{pattern:'email'}},
    				{name:'textarea',label:'Textarea',editor:'textarea'},
    				{name:'select',label:'Select',editor:'select',options:[{value:'1',name:'option1'},{value:'2',name:'option2'}]},
    				{name:'checkbox',label:'Checkboxes',editor:'checkbox',options:[{value:'1',label:'option1'},{value:'2',label:'option2'}]},
    				{name:'radio',label:'Radios',editor:'radio',options:[{value:'1',label:'option1'},{value:'2',label:'option2'}]}
    			])
    		});
    
    		layout.formRegion.show(form);
    
    		var panel = new Juggler.Widgets.Panel({header:'panel title',body:'panel body',footer:'panel footer'});
    
    		layout.panelRegion.show(panel);
    
    		var dialog = new Juggler.Widgets.Dialog();
    
    		//Juggler.dialogRegion.show(dialog);
    
    		//dialog.bodyRegion.show(form)
    		
    	});
    
    });
    
    
    
	
	App.addInitializer(function(){
		
	});
	
	
    
    return App;

}));
