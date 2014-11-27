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
    				{name:'Docs',label:'docs',items:[{name:'dropdown1',label:'dropdown1'}]},
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
    				{name:'Demo',value:'demo'},
    				{name:'Examples',value:'examples'}
    			]);
    		}
    	});
    
    	Enities.Form = Juggler.Enities.Form.extend({
    		defaults:{
    			input:'MillerRen@github.com',
    			static:'static text',
    			textarea:'textarea',
    			select:'2',
    			checkbox:['1','2'],
    			radio:2
    		}
    	});
    
    });

    App.module('Header',function(Header, App, Backbone, Marionette, $, _){
    
    	Header.Navbar = Juggler.Components.Navbar.extend({
    
    	});
    
    	Header.NavData = Juggler.Enities.Collection.extend({
    
    	});
    
    	Header.on('start',function(){
    		var navbar = new Header.Navbar();
    		var collection = new Header.NavData([
    				{name:'',label:'Home'},
    				{name:'GridLayout',label:'GridLayout'},
    				{name:'Form',label:'Form'},
    				{name:'Table',label:'Table'},
    				{name:'Nav',label:'Nav'},
    				{name:'Button',label:'Button'},
    				{name:'Dialog',label:'Dialog'}
    			]);
    		var nav = new Juggler.Widgets.Nav({
    			collection:collection
    		});
    		Juggler.headerRegion.show(navbar);
    		navbar.primaryRegion.show(nav);
    	});
    
    });
    

    App.module('Home',function(Home, App, Backbone, Marionette, $, _){
    
    	Home.startWithParent = false;
    	
    	Home.Carousel = Juggler.Components.Carousel.extend({
    
    	});
    
    	Home.Data = Juggler.Enities.Collection.extend({
    
    	});
    
    	Home.on('start',function(){
    		var carousel = new Home.Carousel({
    			collection:new Home.Data([
    				{img:'images/juggler.jpg',caption:'caption1'},
    				{img:'images/juggler.jpg',caption:'caption2'}
    			])
    		});
    		Juggler.mainRegion.show(carousel);
    	});
    
    });
    

    App.module('Layout',function(Layout, App, Backbone, Marionette, $, _){
    	
    	Layout.startWithParent  = false;
    	
    	Layout.Layout = Juggler.Widgets.GridLayout.extend({
    
    	});
    
    	Layout.on('start',function(){
    		var layout = new Juggler.Widgets.GridLayout({
    			className:'grid-layout-demo',
    			collection:new Juggler.Enities.Collection([
    				{sidebar:{md:{3:'',push:9}},content:{md:{9:'',pull:3}}},
    				{panel:{md:4},form:{md:8}},
    				{tabs:{md:6},toolbar:{md:6}},
    			])
    		});
    		Juggler.mainRegion.show(layout);
    	});
    
    });
    

    App.module('Form',function(Form, App, Backbone, Marionette, $, _){
    	
    	Form.startWithParent  = false;
    	
    	Form.Form = Juggler.Widgets.Form.extend({
    
    	});
    
    	Form.on('start',function(){
    		window.form = new Form.Form({
    			submit:'提交',
    			model:new App.Enities.Form(),
    			collection:new Juggler.Enities.Fields([
    				{name:'input',label:'Input',editor:'email',validator:{format:'email',required:true}},
    				{name:'static',label:'Static',editor:'static'},
    				{name:'textarea',label:'Textarea',editor:'textarea'},
    				{name:'select',label:'Select',editor:'select',items:[{value:'1',label:'option1'},{value:'2',label:'option2'}]},
    				{name:'checkbox',label:'Checkboxes',editor:'checkbox',items:[{value:'1',label:'option1'},{value:'2',label:'option2'}],validator:{blank:false}},
    				{name:'radio',label:'Radios',editor:'radio',items:[{value:'1',label:'option1'},{value:'2',label:'option2'}]}
    			])
    		});
    		Juggler.mainRegion.show(form);
    	});
    
    });
    

    App.module('Table',function(Table, App, Backbone, Marionette, $, _){
    	
    	Table.startWithParent  = false;
    	
    	Table.Table = Juggler.Widgets.Table.extend({
    
    	});
    
    	Table.on('start',function(){
    		var table = new Juggler.Widgets.Table({
    			collection:new App.Enities.Table,
    			columns:new Juggler.Enities.Columns([{name:'name',value:'Name',readonly:false},{name:'value',value:'Label'}])
    		});
    		Juggler.mainRegion.show(table);
    	});
    
    });
    

    App.module('Nav',function(Nav, App, Backbone, Marionette, $, _){
    	
    	Nav.startWithParent  = false;
    
    	Nav.Layout = Juggler.Widgets.GridLayout.extend({
    
    	});
    	
    	Nav.Tabs = Juggler.Widgets.Tabs.extend({
    
    	});
    
    	Nav.Pills = Juggler.Widgets.Pills.extend({
    
    	});
    
    	Nav.on('start',function(){
    		var collection = new Juggler.Enities.Collection([
    			{name:'tabs1',label:'tabs1',content:'tabs content 1'},
    			{name:'tabs2',label:'tabs2',content:'tabs content 2'}
    			]);
    		var layout = new Nav.Layout({
    			collection:new Juggler.Enities.Collection([
    				{tabs:{md:6},pills:{md:6}}
    			])
    		});
    		var tabs = new Nav.Tabs({
    			collection:collection
    		});
    		var pills = new Nav.Pills({
    			collection:collection
    		});
    		Juggler.mainRegion.show(layout);
    		layout.tabsRegion.show(tabs);
    		layout.pillsRegion.show(pills);
    	});
    
    });
    

    App.module('Button',function(Button, App, Backbone, Marionette, $, _){
    	
    	Button.startWithParent  = false;
    	
    	Button.Button = Juggler.Widgets.Button.extend({
    
    	});
    
    	Button.on('start',function(){
    		var toolbar = new Juggler.Widgets.Toolbar({
    			collection:new Juggler.Enities.Toolbar([
    			[{name:'Button',icon:'glyphicon glyphicon-star'},{type:'warning',name:'Group'}],
    			[{type:'primary',name:'Button'},{type:'danger',name:'Group'}],
    			[{size:'lg',name:'Large'},{size:'',name:'Normal'},{size:'sm',name:'sm'}]
    			])
    		});
    		Juggler.mainRegion.show(toolbar);
    	});
    
    });
    

    App.module('Dialog',function(Dialog, App, Backbone, Marionette, $, _){
    	
    	Dialog.startWithParent  = false;
    	
    	Dialog.Form = Juggler.Widgets.Form.extend({
    
    	});
    
    	Dialog.Dialog = Juggler.Widgets.Dialog.extend({
    		
    	});
    
    	Dialog.on('start',function(){
    		var dialog = new Dialog.Dialog({
    			title:'Dialog Demo'
    		});
    		var form = new Dialog.Form({
    			submit:'提交',
    			model:new App.Enities.Form(),
    			collection:new Juggler.Enities.Fields([
    				{name:'input',label:'Input',editor:'email',validator:{format:'email',required:true}},
    				{name:'textarea',label:'Textarea',editor:'textarea'},
    				{name:'select',label:'Select',editor:'select',items:[{value:'1',label:'option1'},{value:'2',label:'option2'}]},
    				{name:'checkbox',label:'Checkboxes',editor:'checkbox',items:[{value:'1',label:'option1'},{value:'2',label:'option2'}],validator:{blank:false}},
    				{name:'radio',label:'Radios',editor:'radio',items:[{value:'1',label:'option1'},{value:'2',label:'option2'}]}
    			])
    		});
    		Juggler.mainRegion.show(dialog);
    		dialog.bodyRegion.show(form);
    	});
    
    });
    

    App.module('Demo',function(Demo, App, Backbone, Marionette, $, _){
    	
    	Demo.AppRouter = Juggler.AppRouter.extend({
    		appRoutes:{
    			'':'home',
    			'GridLayout':'layout',
    			'Form':'form',
    			'Table':'table',
    			'Nav':'nav',
    			'Button':'button',
    			'Dialog':'dialog'
    		}
    	});
    
    	Demo.Controller = Juggler.Controller.extend({
    		home:function(){
    			App.startSubApp('Home');
    		},
    		layout:function(){
    			App.startSubApp('Layout');
    		},
    		form:function(){
    			App.startSubApp('Form');
    		},
    		table:function(){
    			App.startSubApp('Table');
    		},
    		nav:function(){
    			App.startSubApp('Nav');
    		},
    		button:function(){
    			App.startSubApp('Button');
    		},
    		dialog:function(){
    			App.startSubApp('Dialog');
    		}
    	});
    	
    	Demo.on('start',function(){
    
    		new Demo.AppRouter({
    			controller:new Demo.Controller()
    		});
    		return;
    		
    
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
    			columns:new Juggler.Enities.Columns([{name:'name',value:'名称',readonly:false},{name:'value',value:'标签'}])
    		});
    
    		layout.contentRegion.show(table);
    
    		var form = new Juggler.Widgets.Form({
    			submit:'提交',
    			model:new App.Enities.Form(),
    			collection:new Juggler.Enities.Fields([
    				{name:'input',label:'Input',editor:'email',validator:{format:'email',required:true}},
    				{name:'textarea',label:'Textarea',editor:'textarea'},
    				{name:'select',label:'Select',editor:'select',items:[{value:'1',label:'option1'},{value:'2',label:'option2'}]},
    				{name:'checkbox',label:'Checkboxes',editor:'checkbox',items:[{value:'1',label:'option1'},{value:'2',label:'option2'}],validator:{blank:false}},
    				{name:'radio',label:'Radios',editor:'radio',items:[{value:'1',label:'option1'},{value:'2',label:'option2'}]}
    			])
    		});
    
    		//layout.formRegion.show(form);
    
    		var panel = new Juggler.Widgets.Panel({header:'panel title',body:'panel body',footer:'panel footer'});
    
    		layout.panelRegion.show(panel);
    
    		var dialog = new Juggler.Widgets.Dialog({header:'form title'});
    
    		Juggler.dialogRegion.show(dialog);
    
    		dialog.bodyRegion.show(form)
    
    		var toolbar = new Juggler.Widgets.Toolbar({
    			collection:new Juggler.Enities.Toolbar([
    			[{name:'Button',icon:'glyphicon glyphicon-star'},{type:'warning',name:'Group'}],
    			[{type:'primary',name:'Button'},{type:'danger',name:'Group'}],
    			[{size:'lg',name:'Large'}]
    			])
    		});
    
    		layout.toolbarRegion.show(toolbar);
    
    		var tabs_panels = new Juggler.Components.TabsPanels({
    			collection:new Juggler.Enities.Collection([
    			{name:'tabs1',label:'tabs1',content:'tabs content 1'},
    			{name:'tabs2',label:'tabs2',content:'tabs content 2'}
    			])
    		});
    
    		layout.tabsRegion.show(tabs_panels);
    
    		var navbar = new Juggler.Components.Navbar({
    			collection:new App.Enities.Navs,
    			collection2:new App.Enities.Navs
    		});
    
    		//Juggler.headerRegion.show(navbar);
    		
    	});
    
    });
    
    
    
	
	App.addInitializer(function(){
		
	});
	
	
    
    return App;

}));
