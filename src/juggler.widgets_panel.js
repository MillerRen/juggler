Juggler.module('Widgets', function(Widgets, Juggler, Backbone, Marionette, $, _) {

    Widgets.Panel = Juggler.Views.LayoutView.extend({
        className:'panel panel-default',
        template:Juggler.Templates.panel,
        ui:{
            header:'.panel-heading',
            body:'.panel-body',
            footer:'.panel-footer'
        },
        options:{
            header:'',
            body:'',
            footer:''
        },
        get:function(key){
            return this.serializeData()[key];
        },
        set:function(key, value){
            this[key+'Region'].close();
            this.model?this.model.set(key,value):(this.options[key]=value,this.ui[key].html(value));
            value?this.ui[key].show():this.ui[key].hide();
        },
        onRender:function(){
            this.get('header')?this.ui.header.show():this.ui.header.hide();
            this.get('footer')?this.ui.footer.show():this.ui.footer.hide();
        }
    });

});