Juggler.module('Enities', function(Enities, Juggler, Backbone, Marionette, $, _) {
    
    Enities.model_to_collection = function(model, name, value, Collection){
        Collection = Collection||Enities.Collection;
        name = name||'name';
        value = value||'label';
        return new Collection(
            _.map(model.toJSON(), function(item,i){
                var data = {};
                data[name]=item;
                data[value]=i;
                
                return data;
            })
        );
    };
    
    Enities.Model = Backbone.RelationalModel.extend({
        urlRoot: '/test',
        message: Juggler.Config.Message,
        parse: function(resp, options) {
            return options.collection ? resp : resp.data;
        },
        index:function(){
            return this.collection.indexOf(this);
        },
        prev:function(){
            return this.collection.at(this.index()-1);
        },
        next:function(){
            return this.collection.at(this.index()+1);
        }
    });

    Enities.Collection = Backbone.Collection.extend({
        url:'/test',
        message: Juggler.Config.Message,
        parse: function(resp, options) {
            return options.collection ? resp : resp.data;
        },
        up: function(model) {
          var index = this.indexOf(model);
          if (index > 0){
            this.swap(index, index-1);
          }
        },
        down: function(model) {
          var index = this.indexOf(model);
          if (index < this.models.length) {
            this.swap(index, index+1);
          }
        },
        swap: function (indexA, indexB) {
          this.models[indexA] = this.models.splice(indexB, 1, this.models[indexA])[0];
        }
    });

    Enities.Cell = Enities.Model.extend({

    });

    Enities.Row = Enities.Collection.extend({
        model:Enities.Cell
    });

    Enities.Column = Enities.Model.extend({
        defaults: {
            name: undefined,
            label: undefined,
            sortable: false,
            editable: false,
            renderable: true,
            formatter: undefined,
            sortType: "cycle",
            sortValue: undefined,
            direction: null,
            cell: undefined,
            headerCell: undefined
        }
    });

    Enities.Columns = Enities.Collection.extend({
        model:Enities.Column
    });

    Enities.Field = Enities.Model.extend({
       defaults:{
           label:'label',
           editor:'Input'
       },
       validation:function(){
           return {value:{pattern:'email'}}
       }
    });

    Enities.Fields = Enities.Collection.extend({
        model:Enities.Field
    });

    Enities.Form = Enities.Model.extend({
        
    });

});