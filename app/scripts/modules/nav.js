App.module('Nav',function(Nav, App, Backbone, Marionette, $, _){
	
	Nav.startWithParent  = false;

	Nav.Layout = Juggler.Widgets.GridLayout.extend({

	});
	
	Nav.Tabs = Juggler.Widgets.Tabs.extend({

	});

	Nav.Pills = Juggler.Widgets.Pills.extend({

	});

	Nav.on('start',function(){
		var collection = new Juggler.Enities.Collection([
			{name:'tabs1',label:'tabs1',content:'tabs content 1'},
			{name:'tabs2',label:'tabs2',content:'tabs content 2'}
			]);
		var layout = new Nav.Layout({
			collection:new Juggler.Enities.Collection([
				{tabs:{md:6},pills:{md:6}}
			])
		});
		var tabs = new Nav.Tabs({
			collection:collection
		});
		var pills = new Nav.Pills({
			collection:collection
		});
		Juggler.mainRegion.show(layout);
		layout.tabsRegion.show(tabs);
		layout.pillsRegion.show(pills);
	});

});
