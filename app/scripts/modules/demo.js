App.module('Demo',function(Demo, App, Backbone, Marionette, $, _){
	
	Demo.AppRouter = Juggler.AppRouter.extend({
		appRoutes:{
			'GridLayout':'layout',
			'Form':'form',
			'Table':'table',
			'Nav':'nav',
			'Button':'button',
			'Dialog':'dialog'
		}
	});

	Demo.Controller = Juggler.Controller.extend({
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

