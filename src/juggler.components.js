Juggler.module('Components', function(Components, Juggler, Backbone, Marionette, $, _) {
    
    Components.TabsPanels = Juggler.Views.LayoutView.extend({
        className:'tabs-panels',
        template:_.template('<div class="tabs"></div><div class="panels"></div>'),
        regions:{
            tabsRegion:'.tabs',
            panelsRegion:'.panels'
        },
        onRender:function(){
            this.tabsRegion.show(new Juggler.Widgets.Tabs(this.options));
            this.panelsRegion.show(new Juggler.Widgets.TabsContent(this.options));
        }
    });

    Components.Navbar = Juggler.Views.LayoutView.extend({
        className:'navbar',
        template:Juggler.Templates.navbar,
        options:{
            type:'default',
            position:'static',
            container:'container',
            brand:'Juggler'
        },
        ui:{
            brand:'.navbar-brand',
            primary:'.navbar-nav-primary',
            secondary:'.navbar-nav-secondary',
            form:'.navbar-form'
        },
        templateHelpers:function(){
            return this.options;
        },
        onRender:function(){
            var data = this.options;
            this.$el.
                addClass('navbar-'+data.type).
                addClass('navbar-'+data.position);
        }
    });


    Components.Carousel = Juggler.Views.CompositeView.extend({
        className:'juggler-carousel',
        template:Juggler.Templates.carousel,
        childView:Juggler.Views.ItemView.extend({
            className:'item',
            template:_.template('<img src="<%- img %>" />\
            <div class="carousel-caption"><%- caption %></div>')
        }),
        childViewContainer:'.carousel-inner',
        templateHelpers:function(){
            return {
                id:this.cid,
                items:this.collection.toJSON()
            }
        },
        onRender:function(){
            this.$el.carousel();
        }
    });

});