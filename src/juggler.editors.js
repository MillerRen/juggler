Juggler.module('Editors', function(Editors, Juggler, Backbone, Marionette, $, _) {

    Editors.Base = Juggler.Views.CompositeView.extend({
        className:'juggler-editor',
        template:_.template(''),
        ui:{
            input:':input'
        },
        events:{
            'change':'onChange',
            'keyup':'onChange'
        },
        initialize:function(){
            var data = this.serializeData();
            this.collection = new Juggler.Enities.Collection(data.items)
        },
        focus:function(){
            this.ui.input.focus();
        },
        onRender:function(){
            var data = this.serializeData();
            var attr = {
                id:data.cid,
                placeholder:data.placeholder,
                name:data.name
            };
            this.ui.input.
                attr(attr).
                val(data.value);
        },
        onChange:function(){
            this.model.set({value:this.$el.val()},{validate:false});
            this.model.validate('value');
        }
    });
    
    Editors.Input = Editors.Base.extend({
        template:_.template('<input type="text" />'),
        onRender:function(){
            Editors.Input.__super__.onRender.apply(this,arguments);
            this.ui.input.addClass('form-control')
        }
    });

    Editors.Number = Editors.Input.extend({
        template:_.template('<input type="number" />')
    });

    Editors.Email = Editors.Input.extend({
        template:_.template('<input type="email" />')
    });

    Editors.Url = Editors.Input.extend({
        template:_.template('<input type="url" />')
    });

    Editors.Date = Editors.Input.extend({
        template:_.template('<input type="date" />')
    });

    Editors.Datetime = Editors.Input.extend({
        template:_.template('<input type="datetime" />')
    });

    Editors.Textarea = Editors.Input.extend({
        template:_.template('<textarea />')
    });

    Editors.Select = Editors.Input.extend({
        template:_.template('<select />'),
        childViewContainer:'select',
        childView:Juggler.Views.ItemView.extend({
            tagName:'option',
            onRender:function(){
                var data = this.serializeData();
                this.$el.prop('value',data.value)
                    .text(data.label);
            }
        })
    });

    Editors.Checkbox = Editors.Base.extend({
        template:_.template('<div class="checkbox"></div>'),
        childViewContainer:'.checkbox',
        childView:Editors.Base.extend({
            tagName:'label',
            template:_.template('<input type="checkbox"><span><%- label %><span>')
        }),
        onChange:function(){
            var value = _.map(this.$('input').serializeArray(),function(item){
                return item.value;
            });console.log(this.$(':checked').val())
            this.model.set({value:value},{validate:false});
            this.model.validate('value');
        }
    });

    Editors.Radio = Editors.Checkbox.extend({
        template:_.template('<div class="radio"></div>'),
        childViewContainer:'.radio',
        childView:Juggler.Views.ItemView.extend({
            tagName:'label',
            template:_.template('<input type="radio"><span><%- label %><span>')
        }),
        onChange:function(){
            var value = this.$('input').val();
            this.model.set({value:value},{validate:false});
            this.model.validate('value');
        }
    });

});