Juggler.module('Views', function(Views, Juggler, Backbone, Marionette, $, _) {
    
    Views.ItemView = Marionette.ItemView.extend({
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

    Views.LayoutView = Marionette.LayoutView.extend({
        className:'row',
        regionAttr:'data-region',
        template: _.template(''),
        render: function() {
            Views.LayoutView.__super__.render.apply(this,arguments);
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
            return Views.LayoutView.__super__.serializeData.apply(this,arguments)||this.options;
        }
    });

    Views.CollectionView = Marionette.CollectionView.extend({
        emptyView: Views.EmptyView,
        template: _.template(''),
        childViewOptions:function(){
            return {parent:this};
        }
    });

    Views.CompositeView = Marionette.CompositeView.extend({
        emptyView: Views.EmptyView,
        childViewContainer: "",
        template: _.template(''),
        childViewOptions:function(){
            return {parent:this};
        }
    });

    Views.ListItemView = Views.ItemView.extend({
        tagName: 'li',
        template: _.template('<a data-target="#<%- name %>" data-toggle="tab"><%- label %></a>'),
        triggers:{
           'click a':'click' 
        }
    });

    Views.ListView = Views.CompositeView.extend({
        tagName: 'ul',
        template: _.template(''),
        childView: Views.ListItemView,
        childEvents:{
          'click':'onClick'  
        },
        onClick:function(view){
          Backbone.history.navigate(view.model.get('name')); 
        }
    });


});