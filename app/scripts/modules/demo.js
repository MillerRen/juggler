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