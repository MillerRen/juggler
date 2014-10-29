App.module('Demo',function(Demo, App, Backbone, Marionette, $, _){

	Demo.on('start',function(){
		var layout = new App.Layout.Page();
		Juggler.mainRegion.show(layout);

		var navbar = new Juggler.Widgets.Navbar({
			collection:new Demo.Enities.Navs
		});
		Juggler.headerRegion.show(navbar);

		var breadcrumb = new Juggler.Widgets.Breadcrumb({
			collection:new Demo.Enities.Breadcrumb()
		});console.log(layout)
		layout.breadcrumbRegion.show(breadcrumb);
		
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

	Enities.Breadcrumb = Juggler.Enities.Collection.extend({
		initialize:function(){
			this.reset([
				{name:'Demo',value:'demo'},
				{name:'Examples',value:'examples'}
			]);
		}
	});

});