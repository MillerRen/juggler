App.module('Demo',function(Demo, App, Backbone, Marionette, $, _){

	Demo.on('start',function(){
		var layout = new Demo.Layout.Layout39();
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