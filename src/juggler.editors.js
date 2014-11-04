Juggler.module('Editors', function(Editors, Juggler, Backbone, Marionette, $, _) {

    Editors.Input = Juggler.Views.ItemView.extend({
        tagName:'input',
        className:'form-control',
        onRender:function(){
            this.setValue(this.model.get('value'));
            this.setName(this.model.get('name'));
        },
        setName:function(name){
            this.$el.attr('name',name);
        },
        setValue:function(value){
            this.$el.val(value);
        },
        getValue:function(){
            return this.$el.val();
        }
    });

    Editors.Textarea = Editors.Input.extend({
        tagName:'textarea',
        className:'form-control',
        setValue:function(value){
            this.$el.text(value);
        },
        getValue:function(){
            return this.$el.text();
        }
    });

});