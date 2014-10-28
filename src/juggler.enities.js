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

});