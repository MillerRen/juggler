App.module('Header',function(Header, App, Backbone, Marionette, $, _){

	Header.Navbar = Juggler.Components.Navbar.extend({

	});

	Header.NavData = Juggler.Enities.Collection.extend({

	});

	Header.on('start',function(){
		var navbar = new Header.Navbar();
		var collection = new Header.NavData([
				{name:'',label:'Home'},
				{name:'GridLayout',label:'GridLayout'},
				{name:'Form',label:'Form'},
				{name:'Table',label:'Table'},
				{name:'Nav',label:'Nav'},
				{name:'Button',label:'Button'},
				{name:'Dialog',label:'Dialog'}
			]);
		var nav = new Juggler.Widgets.Nav({
			collection:collection
		});
		Juggler.headerRegion.show(navbar);
		navbar.primaryRegion.show(nav);
	});

});
