App.module('Header',function(Header, App, Backbone, Marionette, $, _){

	Header.Navbar = Juggler.Components.Navbar.extend({

	});

	Header.NavData = Juggler.Enities.Collection.extend({

	});

	Header.on('start',function(){
		var navbar = new Header.Navbar({
			brand:'Juggler',
			collection:new Header.NavData([
				{name:'',label:'Home'},
				{name:'GridLayout',label:'GridLayout'},
				{name:'Form',label:'Form'},
				{name:'Table',label:'Table'},
				{name:'Nav',label:'Nav'},
				{name:'Button',label:'Button'},
				{name:'Dialog',label:'Dialog'}
			])
		});
		Juggler.headerRegion.show(navbar);
	});

});
