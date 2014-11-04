Juggler.module('Editors', function(Editors, Juggler, Backbone, Marionette, $, _) {

    Editors.Base = Juggler.Views.ItemView.extend({
        className:'form-control',
        setName:function(name){
            this.$el.attr('name',name);
        },
        setValue:function(value){
            this.$el.val(value);
        },
        getValue:function(){
            return this.$el.val();
        },
        onRender:function(){
            this.setValue(this.model.get('value'));
            this.setName(this.model.get('name'));
        }
    });
    
    Editors.Input = Editors.Base.extend({
        tagName:'input'
    });

    Editors.Textarea = Editors.Base.extend({
        tagName:'textarea',
        className:'form-control',
        setValue:function(value){
            this.$el.text(value);
        },
        getValue:function(){
            return this.$el.text();
        }
    });

    Editors.Select = Juggler.Views.CompositeView.extend({
        tagName:'select',
        className:'form-control',
        childView:Juggler.Views.ItemView.extend({
            tagName:'option',
            onRender:function(){
                this.$el.attr('value',this.model.get('value'))
                    .text(this.model.get('name'));
            }
        }),
        initialize:function(){
            this.collection = new Juggler.Enities.Collection(this.model.get('options'));
        },
        onRender:function(){
            this.setValue(this.model.get('value'));
        },
        setValue:function(value){
            this.$el.find('[value='+value+']').attr('selected','selected');
        },
        getValue:function(){
            return this.$el.val();
        }
    });

});