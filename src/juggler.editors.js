Juggler.module('Editors', function(Editors, Juggler, Backbone, Marionette, $, _) {

    Editors.Base = Juggler.Views.ItemView.extend({
        className:'form-control',
        bindings:{':el':{
            observe:'value',
            attributes:[
                {name:'value',observe:'value'},
                {name:'id',observe:'cid'},
                {name:'placeholder',observe:'placeholder'},
                {name:'name',observe:'name'},
                {name:'type',observe:'editor'}
            ]
        }},
        focus:function(){
            this.$el.focus();
        },
        onRender:function(){
            this.stickit();
        },
        onDestory:function(){
            this.unstickit()
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
        tagName:'textarea'
    });

    Editors.Select = Editors.Base.extend({
        tagName:'select',
        template:function(data){
            return _.map(data.items,function(item,i){
                return '<option value="'+item.value+'">'+item.name+'</option>';
            }).join('');
        }
    });

    Editors.Checkbox = Juggler.Views.ItemView.extend({
        className:'checkbox',
        bindings:{'input':'value'},
        template:function(data){
            return _.map(data.items,function(item,i){
                return '<label class="checkbox-inline"><input type="checkbox" value="'+item.value+'">'+item.name+'</label>';
            }).join('');
        },
        onRender:function(){
            this.stickit();
        },
        onDestory:function(){
            this.unstickit()
        }
    });

    Editors.Radio = Editors.Checkbox.extend({
        className:'radio',
        bindings:{'input':'value'},
        template:function(data){
            return _.map(data.items,function(item,i){
                return '<label class="checkbox-inline"><input type="radio" value="'+item.value+'">'+item.name+'</label>';
            }).join('');
        }
    });

});