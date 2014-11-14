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
        onChange:function(){
            this.model.set({value:this.$el.val()},{validate:false});
            this.model.validate('value');
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
                var checked = data.value==item.value?'selected':'';
                return '<option value="'+item.value+'" '+checked+'>'+item.label+'</option>';
            }).join('');
        }
    });

    Editors.Checkbox = Juggler.Views.ItemView.extend({
        className:'',
        bindings:{'input':'value'},
        template:function(data){
            return _.map(data.items,function(item,i){
                var checked = _.contains(data.value,item.value)||data.value==item.value?'checked':'';
                return '<label class="'+data.editor+'-inline">'+
                '<input type="'+data.editor+'" value="'+item.value+'" name="'+data.name+'[]" '+checked+'>'
                +item.label+'</label>';
            }).join('');
        },
        events:{
            'change input':'onChange'
        },
        onChange:function(){
            var value = _.map(this.$('input').serializeArray(),function(item){
                return item.value;
            });
            this.model.set({value:value},{validate:false});
            this.model.validate('value');
        }
    });

    Editors.Radio = Editors.Checkbox.extend({
        onChange:function(){
            var value = this.$('input').val();
            this.model.set({value:value},{validate:false});
            this.model.validate('value');
        }
    });

});