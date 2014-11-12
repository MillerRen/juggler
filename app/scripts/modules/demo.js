App.module('Demo',function(Demo, App, Backbone, Marionette, $, _){

	Demo.on('start',function(){
		 window.layout = new Juggler.Widgets.GridLayout({
			collection:new Juggler.Enities.Collection([
				{sidebar:{md:{3:'',push:9}},content:{md:{9:'',pull:3}}},
				{panel:{md:3},form:{md:9}},
				{test:{md:3},toolbar:{md:9}},
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
				{name:'input',label:'Input',editor:'input',validator:{format:'email'}},
				{name:'textarea',label:'Textarea',editor:'textarea'},
				{name:'select',label:'Select',editor:'select',items:[{value:'1',name:'option1'},{value:'2',name:'option2'}]},
				{name:'checkbox',label:'Checkboxes',editor:'checkbox',items:[{value:'1',name:'option1'},{value:'2',name:'option2'}]},
				{name:'radio',label:'Radios',editor:'radio',items:[{value:'1',name:'option1'},{value:'2',name:'option2'}]}
			])
		});

		layout.formRegion.show(form);

		var panel = new Juggler.Widgets.Panel({header:'panel title',body:'panel body',footer:'panel footer'});

		layout.panelRegion.show(panel);

		var dialog = new Juggler.Widgets.Dialog();

		//Juggler.dialogRegion.show(dialog);

		//dialog.bodyRegion.show(form)

		var toolbar = new Juggler.Widgets.Toolbar({
			collection:new Juggler.Enities.ButtonGroup([
			[{name:'Button',icon:'glyphicon glyphicon-star'},{type:'warning',name:'Group'}],
			[{type:'primary',name:'Button'},{type:'danger',name:'Group'}],
			[{size:'lg',name:'Large'}]
			])
		});

		layout.toolbarRegion.show(toolbar);
		
	});

});

