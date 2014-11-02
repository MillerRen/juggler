App.module('Demo',function(Demo, App, Backbone, Marionette, $, _){

	Demo.on('start',function(){
		 window.layout = new Juggler.Widgets.GridLayout({
			collection:new Juggler.Enities.Collection([
				{sidebar:{md:{3:'',push:9}},content:{md:{9:'',pull:3}}},
				{test:{md:3},test2:{md:9}},
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
			collection:new App.Enities.Table
		});

		layout.contentRegion.show(table);
		
	});

});

