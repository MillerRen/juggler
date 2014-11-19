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
            position:'static-top'
        },
        ui:{
            brand:'.navbar-brand',
            navbarPrimary:'.navbar-primary',
            navbarSecondary:'.navbar-secondary'
        },
    });

});