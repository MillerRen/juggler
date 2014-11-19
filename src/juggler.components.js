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
        className:function(){
            var data = this.serializeData();
            return ['navbar','navbar-'+data.type,'navbar-'+data.position].join(' ');
        },
        template:Juggler.Templates.navbar,
        options:{
            type:'default',
            position:'static-top',
            container:'container',
            brand:'Home'
        },
        ui:{
            brand:'.navbar-brand',
            primary:'.navbar-nav-primary',
            secondary:'.navbar-nav-secondary',
            form:'.navbar-form'
        },
        onRender:function(){
            this.collection&&this.primaryRegion.show(new Juggler.Widgets.Nav({
                collection:this.collection
            }));
            this.options.collection2&&this.secondaryRegion.show(new Juggler.Widgets.Nav({
                collection:this.options.collection2
            }));
            this.options.form&&this.formRegion.show(new Juggler.Widgets.Form(this.options.form));
        }
    });

});