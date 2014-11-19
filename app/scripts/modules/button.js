App.module('Button',function(Button, App, Backbone, Marionette, $, _){
	
	Button.startWithParent  = false;
	
	Button.Button = Juggler.Widgets.Button.extend({

	});

	Button.on('start',function(){
		var toolbar = new Juggler.Widgets.Toolbar({
			collection:new Juggler.Enities.Toolbar([
			[{name:'Button',icon:'glyphicon glyphicon-star'},{type:'warning',name:'Group'}],
			[{type:'primary',name:'Button'},{type:'danger',name:'Group'}],
			[{size:'lg',name:'Large'},{size:'',name:'Normal'},{size:'sm',name:'sm'}]
			])
		});
		Juggler.mainRegion.show(toolbar);
	});

});
