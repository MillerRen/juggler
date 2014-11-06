Juggler.module('Editors', function(Editors, Juggler, Backbone, Marionette, $, _) {

    Editors.Base = Juggler.Views.CompositeView.extend({
        className:'form-control',
        bindings:{
            ':el':{
                observe:'value',
                setOptions:{validate:true}
            }
        },
        initialize:function(){
            this.collection = new Juggler.Enities.Collection(this.model.get('options')||[]);
        },
        setName:function(name){
            this.$el.attr('name',name);
        },
        onRender:function(){
            this.setName(this.model.get('name'));
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

    Editors.Checkbox = Juggler.Views.ItemView.extend({
        tagName:'label',
        className:'checkbox-inline',
        template:_.template('<input type="checkbox" name="<%- name %>" checked="" /><%- label %>')
    })

    Editors.Checkboxes = Editors.Base.extend({
        className:'',
        childView:Editors.Checkbox,
        childViewOptions:function(model,index){
            model.set('name',this.model.get('name'));
            return Editors.Checkboxes.__super__.childViewOptions.apply(this,arguments);
        }
    });

    Editors.Radio = Editors.Input.extend({
        tagName:'label',
        className:'radio-inline',
        template:_.template('<input type="radio" name="<%- name %>" checked="" /><%- label %>'),
        setName:function(name){
            //this.$el.attr('for',name);
        }
    })

    Editors.Radios = Juggler.Views.CompositeView.extend({
        className:'',
        childView:Editors.Radio,
        initialize:function(){
            this.collection = this.collection || new Juggler.Enities.Collection(this.model.get('options'));
        },
        childViewOptions:function(model,index){
            model.set('name',this.model.get('name'));
            return Editors.Checkboxes.__super__.childViewOptions.apply(this,arguments);
        }
    });

});