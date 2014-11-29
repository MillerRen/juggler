App.module('Home',function(Home, App, Backbone, Marionette, $, _){

	Home.startWithParent = false;
	
	Home.Carousel = Juggler.Components.Carousel.extend({

	});

	Home.Data = Juggler.Enities.Collection.extend({

	});

	Home.on('start',function(){
		var carousel = new Home.Carousel({
			collection:new Home.Data([
				{img:'images/juggler.jpg',caption:'caption1'},
				{img:'images/juggler.jpg',caption:'caption2'}
			])
		});
		Juggler.mainRegion.show(carousel);
	});

});
