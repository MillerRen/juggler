Juggler.module('Views', function(Views, Juggler, Backbone, Marionette, $, _) {
    
    Views.ItemView = Marionette.ItemView.extend({
        constructor: function(options) {
            Marionette.ItemView.prototype.constructor.apply(this, arguments);
            _.defaults(this.options,this.defaults);
        },
        template: _.template(''),
        serializeData: function() {
            return this.model?this.model.toJSON():this.options;
        }
    });

    Views.EmptyView = Views.ItemView.extend({
        className: 'alert alert-warning',
        template: _.template('<%= text %>'),
        defaults: {text: 'not found！'},
        serializeData:function(){
            return this.options;
        }
    });

    Views.Layout = Marionette.LayoutView.extend({
        className:'row',
        regionAttr:'data-region',
        template: _.template(''),
        constructor: function(options) {
            Marionette.LayoutView.apply(this, arguments);
            _.defaults(this.options,this.defaults);
        },
        render: function() {
            Views.Layout.__super__.render.apply(this,arguments);
            this.resolveTemplateRegions();
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
        serializeData: function() {
            return this.model?this.model.toJSON():this.options;
        }
    });

    Views.CompositeView = Marionette.CompositeView.extend({
        constructor: function(options) {
            Views.CompositeView.__super__.constructor.apply(this, arguments);
            _.defaults(this.options,this.defaults);
        },
        emptyView: Views.EmptyView,
        childViewContainer: "",
        template: _.template('')
    });

    Views.Item = Views.ItemView.extend({
        tagName: 'li',
        template: _.template('<a data-target="#<%- value %>" data-toggle="tab"><%- name %></a>'),
        triggers:{
           'click a':'click' 
        }
    });

    Views.List = Views.CompositeView.extend({
        tagName: 'ul',
        template: _.template(''),
        childView: Views.Item,
        childEvents:{
          'click':'onClick'  
        },
        onClick:function(view){
          Backbone.history.navigate(view.model.get('value')); 
        }
    });


});