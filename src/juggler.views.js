Juggler.module('Views', function(Views, Juggler, Backbone, Marionette, $, _) {
    
    Views.ItemView = Marionette.ItemView.extend({
        template: _.template(''),
        templateHelpers: function() {
            return this.options;
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
        templateHelpers: function() {
            return this.options;
        }
    });

    Views.CompositeView = Marionette.CompositeView.extend({
        emptyView: Views.EmptyView,
        childViewContainer: "",
        template: _.template(''),
        childViewOptions:function(model,index){
            return {
                parentModel:this.model
            };
        },
        templateHelpers: function() {
            return this.options;
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