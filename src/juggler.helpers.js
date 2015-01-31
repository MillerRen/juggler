Juggler.module('Helpers', function(Helpers, Juggler, Backbone, Marionette, $, _) {

    Helpers.startModule = function(appName, args) {
        var currentApp = Juggler.module(appName);
		
        if (Juggler.currentApp) {
            Juggler.currentApp.stop();
        }
        
        Juggler.currentApp = currentApp;
        currentApp.start(args);
    };

    Helpers.Selection = Marionette.Object.extend({
        constructor:function(options){
            Marionette.Object.apply(this,arguments);
            this.collection = options.collection;
            this.selected = {};
            this.length = 0;
        },
        select:function(model){
            if(this.selected[model.cid]){ return; }
            this.selected[model.cid]=model;
            this.length = _.size(this.selected);
            this.collection.trigger('selected',this.selected);
        },
        deselect:function(model){
            if(!this.selected[model.cid]){ return; }
            delete this.selected[model.cid];
            this.collection.trigger('selected',this.selected);
        },
        selectAll:function(){

        },
        deselectAll:function(){

        },
        toggleSelect:function(){

        },
        selectNext:function(){

        },
        selectPrev:function(){

        }
    });

    Helpers.Validator = Marionette.Object.extend({
        
    });

});