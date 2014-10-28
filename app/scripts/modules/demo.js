App.module('Demo',function(Demo, App, Backbone, Marionette, $, _){
	
	Demo.Layout = Juggler.Views.Layout.extend({
		template:_.template('<div class="col-md-3" data-region="sidebar"></div>\
		<div class="col-md-9" data-region="content"></div>')
	});

	Demo.on('start',function(){
		var layout = new Demo.Layout();
		Juggler.mainRegion.show(layout);

	});

});