Juggler.module('Views', function(Views, Juggler, Backbone, Marionette, $, _) {
    
    Views.ItemView = Marionette.ItemView.extend({
        constructor: function(options) {
            this.options = _.defaults(options,this.defaults);
            Marionette.ItemView.prototype.constructor.apply(this, arguments);
        },
        template: _.template('')
    });

    Views.EmptyView = Views.ItemView.extend({
        className: 'alert alert-warning',
        template: Juggler.Templates.empty,
        defaults: {text: 'not found！'},
        serializeData: function() {
            return this.options
        }
    });

    Views.Layout = Marionette.LayoutView.extend({
        constructor: function(options) {
            this.options = Marionette.getOption(this, 'defaults');
            _.extend(this.options,options);
            this.regions = Marionette.getOption(this, 'regions') || {};
            Marionette.LayoutView.prototype.constructor.apply(this, arguments);
        },
        template: _.template(''),
        onRender: function() {
            var that = this, 
            regions = Marionette.getOption(this, 'regions');

            this.addRegions(regions);

            this.$el.find('[data-region]').each(function(i, item) {
                var region = $(item).attr('data-region');
                if (region)
                    that.addRegion($.camelCase(region), '[data-region=' + region+']');
            });
        },
        serializeData: function() {
            return this.options;
        }
    });

    Views.CompositeView = Marionette.CompositeView.extend({
        emptyView: Views.EmptyView,
        childViewContainer: "",
        template: _.template(''),
        getChildView: function(item) {
            return Views[item.get('viewType')] || Marionette.getOption(this, "childView") || this.constructor;
        }
    });

    Views.Item = Views.ItemView.extend({
        tagName: 'li',
        template: _.template('<a data-target="#<%- value %>" data-toggle="tab"><%- name %></a>'),
        ui: {
            links: 'a',
            buttons: 'btn'
        },
        events: {
            'click @ui.links': 'onClick',
            'click @ui.buttons': 'onPress'
        },
        onClick: function() {
            this.trigger('clicked', this.model);
        },
        onPress:function(){
            thsi.trigger('pressed', this.model);
        }
    });



    Views.List = Views.CompositeView.extend({
        tagName: 'ul',
        template: _.template(''),
        childView: Views.Item
    });


});