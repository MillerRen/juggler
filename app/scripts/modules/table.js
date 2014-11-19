App.module('Table',function(Table, App, Backbone, Marionette, $, _){
	
	Table.startWithParent  = false;
	
	Table.Table = Juggler.Widgets.Table.extend({

	});

	Table.on('start',function(){
		var table = new Juggler.Widgets.Table({
			collection:new App.Enities.Table,
			columns:new Juggler.Enities.Columns([{name:'name',value:'Name',readonly:false},{name:'value',value:'Label'}])
		});
		Juggler.mainRegion.show(table);
	});

});
