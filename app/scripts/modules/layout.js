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
