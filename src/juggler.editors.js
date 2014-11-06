Juggler.module('Editors', function(Editors, Juggler, Backbone, Marionette, $, _) {

    Editors.Base = Juggler.Views.CompositeView.extend({
        className:'form-control',
        bindings:{':el':'value'},
        initialize:function(){
            this.collection = new Juggler.Enities.Collection(this.model.get('options')||[]);
            this.$el.attr('name',this.model.get('name'));
        },
        onRender:function(){
            Backbone.Validation.bind(this);
            this.stickit();
        },
        onDestory:function(){
            Backbone.Validation.unbind(this);
        }
    });
    
    Editors.Input = Editors.Base.extend({
        tagName:'input'
    });

    Editors.Textarea = Editors.Base.extend({
        tagName:'textarea'
    });

    Editors.Select = Editors.Base.extend({
        tagName:'select',
        childView:Juggler.Views.ItemView.extend({
            tagName:'option',
            onRender:function(){
                this.$el.attr('value',this.model.get('value'))
                    .text(this.model.get('name'));
            }
        })
    });

    Editors.Check = Juggler.Views.ItemView.extend({
        tagName:'label',
        className:'checkbox-inline',
        template:_.template('<input type="<%- type %>" value="<%- value %>" name="<%- name %>" /><span><%- label %></span>')
    })

    Editors.Checkbox = Editors.Base.extend({
        className:'',
        childView:Editors.Check,
        bindings:{'input':'value'},
        childViewOptions:function(model,index){
            model.set('name',this.model.get('name'));
            model.set('type',this.model.get('editor'));
            return Editors.Checkbox.__super__.childViewOptions.apply(this,arguments);
        }
    });

    Editors.Radio = Editors.Checkbox.extend({
        childView:Editors.Check.extend({
            className:'radio-inline'
        })
    });

});