Juggler.module('Enities', function(Enities, Juggler, Backbone, Marionette, $, _) {
    
    Enities.Model = Backbone.Model.extend({
        urlRoot: '/test',
        message: Juggler.Config.Message,
        parse: function(resp, options) {
            return options.collection ? resp : resp.data;
        },
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
            readonly:true,
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
           editor:'input',
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