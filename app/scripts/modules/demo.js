App.module('Demo',function(Demo, App, Backbone, Marionette, $, _){

	Demo.on('start',function(){
		 window.layout = new Juggler.Widgets.GridLayout({
			collection:new Juggler.Enities.Collection([
				{sidebar:{md:{3:'',push:9}},content:{md:{9:'',pull:3}}},
				{panel:{md:3},form:{md:9}},
				{tabs:{md:3},toolbar:{md:9}},
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

		//Juggler.dialogRegion.show(dialog);

		//dialog.bodyRegion.show(form)

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

		var navbar = new Juggler.Components.Navbar({});

		//Juggler.headerRegion.show(navbar);
		
	});

});

