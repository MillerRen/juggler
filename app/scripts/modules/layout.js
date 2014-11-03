App.module('Layout',function(Layout, App, Backbone, Marionette, $, _){

	Layout.Page = Juggler.Views.LayoutView.extend({
		template:_.template('<div class="col-md-3" data-region="sidebar"></div>\
				<div class="col-md-9" data-region="content"></div>\
		')
	});

});
