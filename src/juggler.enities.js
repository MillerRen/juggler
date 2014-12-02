Juggler.module('Enities', function(Enities, Juggler, Backbone, Marionette, $, _) {
    
    Enities.Model = Backbone.Model.extend({
        urlRoot: '/test',
        index:function(){
            return this.collection.indexOf(this);
        },
        reset:function(){
            this.clear().set(this.defaults);
        }
    });

    Enities.Collection = Backbone.Collection.extend({
        url:'/test',
        model:Enities.Model,
        swap: function (indexA, indexB) {
          this.models[indexA] = this.models.splice(indexB, 1, this.models[indexA])[0];
        },
        next:function(model){
            var index = this.indexOf(model);
            return this.at(index+1);
        },
        prev:function(model){
            var index = this.indexOf(model);
            return this.at(index-1);
        }
    });

    Enities.Field = Enities.Model.extend({
       defaults:{
           name: undefined,
           label: undefined,
           sortable: false,
           editable:false,
           editor:'input',
           checked:false,
           errors:[]
       },
       validation:function(){
           return {value:this.get('validator')||{}};
       }
    });

    Enities.Fields = Enities.Collection.extend({
        model:Enities.Field
    });

    Enities.Form = Enities.Model.extend({
        
    });

    Enities.Column = Enities.Field.extend({
        
    });

    Enities.Columns = Enities.Collection.extend({
        model:Enities.Column
    });

    Enities.Button = Enities.Model.extend({
        defaults:{
            'type':'default',
            'name':'',
            'icon':'',
            'size':''
        }
    });

    Enities.Toolbar = Enities.Collection.extend({});

    Enities.ButtonGroup = Enities.Collection.extend({
        model:Enities.Button
    });

});