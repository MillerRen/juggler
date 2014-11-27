App.module('Form',function(Form, App, Backbone, Marionette, $, _){
	
	Form.startWithParent  = false;
	
	Form.Form = Juggler.Widgets.Form.extend({

	});

	Form.on('start',function(){
		window.form = new Form.Form({
			submit:'提交',
			model:new App.Enities.Form(),
			collection:new Juggler.Enities.Fields([
				{name:'input',label:'Input',editor:'email',validator:{format:'email',required:true}},
				{name:'textarea',label:'Textarea',editor:'textarea'},
				{name:'select',label:'Select',editor:'select',items:[{value:'1',label:'option1'},{value:'2',label:'option2'}]},
				{name:'checkbox',label:'Checkboxes',editor:'checkbox',items:[{value:'1',label:'option1'},{value:'2',label:'option2'}],validator:{blank:false}},
				{name:'radio',label:'Radios',editor:'radio',items:[{value:'1',label:'option1'},{value:'2',label:'option2'}]}
			])
		});
		Juggler.mainRegion.show(form);
	});

});
