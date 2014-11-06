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
			submit:'提交',
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

