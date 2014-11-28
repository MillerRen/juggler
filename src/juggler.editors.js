Juggler.module('Editors', function(Editors, Juggler, Backbone, Marionette, $, _) {

    Editors.Base = Juggler.Views.CompositeView.extend({
        className:'juggler-editor',
        template:_.template(''),
        ui:{
            input:':input'
        },
        setValue:function(){
            this.ui.input.val(this.model.get('value'));
        },
        getValue:function(){
            return this.ui.input.val();
        },
        setSchema:function(){
            var data = this.serializeData();
            var attr = {
                id:data.cid,
                placeholder:data.placeholder,
                name:data.name
            };
            this.ui.input.attr(attr);
        },
        commit:function(){
            this.model.set({value:this.getValue()});
            this.model.validate('value');
        }
    });

    Editors.Static = Editors.Base.extend({
        template:_.template('<p class="form-control-static"><%- value %></p>')
    });
    
    Editors.Input = Editors.Base.extend({
        template:_.template('<input type="text" />'),
        events:{
            'change':'onChange',
            'keyup':'onChange'
        },
        modelEvents:{
            'change':'onModelChange'
        },
        onRender:function(){
            this.ui.input.addClass('form-control');
            this.setSchema();
            this.setValue();
        },
        onChange:function(){
            this.commit();
        },
        onModelChange:function(){
            this.setSchema();
            this.setValue();
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
        }),
        initialize:function(){
            var items = this.serializeData().items;
            this.collection=this.collection||new Juggler.Enities.Fields(items);
        }
    });

    Editors.Radio = Editors.Base.extend({
        template:_.template('<div class="radio"></div>'),
        childViewContainer:'.radio',
        childView:Editors.Input.extend({
            tagName:'label',
            template:_.template('<input type="radio" checked="<%- checked %>"><span><%- label %></span>'),
            commit:function(){
                this.model.set('checked',this.ui.input.prop('checked'));
            },
            onRender:function(){
                this.setSchema();
            }
        }),
        collectionEvents:{
            'change':'onCollectionChange'
        },
        initialize:function(){
            var items = this.serializeData().items;
            this.collection=this.collection||new Juggler.Enities.Fields(items);
            this.setSchema();
            this.setValue();
        },
        setSchema:function(){
            var model = this.model;
            this.collection.each(function(item,i){
                item.set('name',model.get('name'));
            })
        },
        setValue:function(){
            var values = this.serializeData().value;
            this.collection.each(function(item,i){
                var value = item.get('value');
                item.set('checked',_.contains(values,value));
            });
        },
        getValue:function(){
            var value = this.$('input').val();
            return value;
        },
        onCollectionChange:function(){
            this.commit();
        }
    });

    Editors.Checkbox = Editors.Radio.extend({
        template:_.template('<div class="checkbox"></div>'),
        childViewContainer:'.checkbox',
        childView:Editors.Input.extend({
            tagName:'label',
            template:_.template('<input type="checkbox"  /><span><%- label %></span>'),
            commit:function(){
                var checked = this.ui.input.prop('checked');
                this.model.set('checked',checked);
            },
            onRender:function(){
                this.ui.input.prop('checked',this.model.get('checked'));
            }
        }),
        getValue:function(){
            var value = this.collection.filter(function(item){
                return item.get('checked');
            });
            value = _.map(value,function(item){
                return item.get('value');
            });

            return value;
        }
    });

    

});