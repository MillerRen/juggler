Juggler.module('Editors', function(Editors, Juggler, Backbone, Marionette, $, _) {

    Editors.Base = Juggler.Views.CompositeView.extend({
        className:'form-control',
        childView:Juggler.Views.ItemView,
        bindings:{':el':{
            observe:'value',
            attributes:[
                {name:'value',observe:'value'},
                {name:'id',observe:'cid'},
                {name:'placeholder',observe:'placeholder'},
                {name:'name',observe:'name'}
            ]
        }},
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
        bindings:{
            'input':{
                attributes:[
                    {name:'type',observe:'type'},
                    {name:'value',observe:'value'},
                    {name:'name',observe:'name'}
                ]
            },
            'span':'label'
        },
        template:_.template('<input /><span></span>'),
        onRender:function(){
            this.stickit();
        }
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