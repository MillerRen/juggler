Juggler.module('Enities', function(Enities, Juggler, Backbone, Marionette, $, _) {

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
        }
    });

    Enities.model_to_collection = function(model, name, value, Collection){
        Collection = Collection||Enities.Collection;
        name = name||'name';
        value = value||'value';
        return new Collection(
            _.map(model.toJSON(), function(item,i){
                var data = {};
                data[name]=item;
                data[value]=i;
                
                return data;
            })
        );
    };

});