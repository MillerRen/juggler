App.module('Enities',function(Enities, App, Backbone, Marionette, $, _){

	Enities.Navs = Juggler.Enities.Collection.extend({
		initialize:function(){
			this.reset([
				{name:'Docs',label:'docs',items:[{name:'dropdown1',label:'dropdown1'}]},
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
				{name:'Demo',value:'demo'},
				{name:'Examples',value:'examples'}
			]);
		}
	});

	Enities.Columns = Juggler.Enities.Columns.extend({
		initialize:function(){
			this.reset([
				{name:'name',label:'Name',editable:true},
				{name:'value',label:'Label'}
			]);
		}
	});

	Enities.Form = Juggler.Enities.Form.extend({
		defaults:{
			input:'MillerRen@github.com',
			static:'static text',
			textarea:'textarea',
			select:'2',
			checkbox:['1','2'],
			radio:2
		}
	});

});