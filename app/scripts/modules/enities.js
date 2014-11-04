App.module('Enities',function(Enities, App, Backbone, Marionette, $, _){

	Enities.Navs = Juggler.Enities.Collection.extend({
		initialize:function(){
			this.reset([
				{name:'Docs',label:'docs'},
				{name:'Examples',label:'examples'}
			]);
		}
	});

	Enities.Breadcrumb = Juggler.Enities.Collection.extend({
		initialize:function(){
			this.reset([
				{name:'Demo',label:'demo'},
				{name:'Examples',label:'examples'}
			]);
		}
	});

	Enities.Table = Juggler.Enities.Collection.extend({
		initialize:function(){
			this.reset([
				{name:'Demo',label:'demo'},
				{name:'Examples',label:'examples'}
			]);
		}
	});

	Enities.Form = Juggler.Enities.Model.extend({
		defaults:{
			input:'input',
			textarea:'textarea',
			select:'2',
			checkbox:['1']
		}
	});

});