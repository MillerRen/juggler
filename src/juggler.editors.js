Juggler.module('Editors', function(Editors, Juggler, Backbone, Marionette, $, _) {

    Editors.Base = Juggler.Views.ItemView.extend({
        className:'form-control',
        attributes:function(){
            var data = this.serializeData();
            return {
                id:data.cid,
                value:data.value,
                placeholder:data.placeholder,
                name:data.name,
                type:data.editor
            }
        },
        events:{
            'change':'onChange',
            'keyup':'onChange'
        },
        focus:function(){
            this.$el.focus();
        },
        onRender:function(){
            this.$el.attr(this.attributes())
        },
        onChange:function(){
            this.model.set({value:this.$el.val()},{validate:true})
        }
    });
    
    Editors.Input = Editors.Base.extend({
        tagName:'input'
    });

    Editors.Number = Editors.Input.extend({});

    Editors.Email = Editors.Input.extend({});

    Editors.Url = Editors.Input.extend({});

    Editors.Date = Editors.Input.extend({});

    Editors.Datetime = Editors.Input.extend({});

    Editors.Textarea = Editors.Base.extend({
        tagName:'textarea',
        template:_.template('<%- value %>')
    });

    Editors.Select = Editors.Base.extend({
        tagName:'select',
        template:function(data){
            return _.map(data.items,function(item,i){
                return '<option value="'+item.value+'">'+item.label+'</option>';
            }).join('');
        }
    });

    Editors.CheckboxItem = Juggler.Views.ItemView.extend({
        tagName:'label',
        className:'checkbox-inline',
        template:_.template('<input type="<%- type %>" value="<%- value %>" <%- checked %> /><%- label %>'),
        serializeData:function(){
            var checked = this.getChecked();
            return {
                label:this.model.get('label'),
                value:this.model.get('value'),
                name:this.options.parentModel.get('name'),
                checked:checked?'checked':'',
                type:this.options.parentModel.get('editor')
            }
        },
        getChecked:function(){
            return _.contains(this.options.parentModel.get('value'),this.model.get('value'));
        }
    });

    Editors.Checkbox = Juggler.Views.CompositeView.extend({
        className:'',
        childView:Editors.CheckboxItem,
        template:_.template(''),
        events:{
            'change input':'onChange'
        },
        initialize:function(){
            var items = this.model.get('items');
            this.collection = new Juggler.Enities.Collection(items);
        },
        onRender:function(){
            console.log(this.model.get('items'))
        },
        onChange:function(e){
            var value = _.map(this.$('input').serializeArray(),function(item){
                return item.value;
            });
            var res = this.model.set({value:value},{validate:true,update:true});
        }
    });

    Editors.RadioItem = Editors.CheckboxItem.extend({
        className:'radio-inline',
        getChecked:function(){
            return this.options.parentModel.get('value')==this.model.get('value');
        }
    });

    Editors.Radio = Editors.Checkbox.extend({
        childView:Editors.RadioItem
    });

});