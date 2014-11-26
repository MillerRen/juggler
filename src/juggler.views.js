Juggler.module('Views', function(Views, Juggler, Backbone, Marionette, $, _) {
    
    Views.ItemView = Marionette.ItemView.extend({
        template: _.template(''),
        serializeData: function() {
            var data = Views.ItemView.__super__.serializeData.apply(this,arguments);
            return data||this.options;
        }
    });

    Views.EmptyView = Views.ItemView.extend({
        className: 'alert alert-warning',
        template: _.template('<%= text %>'),
        options: {text: 'not found！'}
    });

    Views.LayoutView = Marionette.LayoutView.extend({
        className:'row',
        regionAttr:'data-region',
        template: _.template(''),
        render: function() {
            this.resolveUIRegions();
            Views.LayoutView.__super__.render.apply(this,arguments);
            this.resolveTemplateRegions();
        },
        resolveUIRegions:function(){
            if(!this.ui)return;
            for(var i in this.ui){
                this.addRegion(i+'Region',this.ui[i])
            }
        },
        resolveTemplateRegions:function(){
            var that = this,
                regionAttr = this.regionAttr,
                region_selector = '['+regionAttr+']';
            this.$el.find(region_selector)
            .each(function(i, item) {
                var region = $(item).attr(regionAttr);
                region&&that.addRegion($.camelCase(region)+'Region', '['+regionAttr+'='+region+']');
            });
            this.triggerMethod('resoveregion');
        },
        serializeData:function(){
            return this.model&&this.model.toJSON()||this.options;
        }
    });

    Views.CompositeView = Marionette.CompositeView.extend({
        childViewContainer: "",
        template: _.template(''),
        childViewOptions:function(model,index){
            var options =  {index:index};
            this.model&&(options.parentModel=this.model);
            return options;
        },
        serializeData: function() {
            var data = Views.CompositeView.__super__.serializeData.apply(this,arguments);
            return data||this.options;
        }
    });


});