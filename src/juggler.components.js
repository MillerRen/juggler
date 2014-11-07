Juggler.module('Components', function(Components, Juggler, Backbone, Marionette, $, _) {
    
    Components.TabsPanels = Juggler.Views.LayoutView.extend({
        className:'tabs-panels',
        template:_.template('<div class="tabs"></div><div class="panels"></div>'),
        regions:{
            tabsRegion:'.tabs',
            panelsRegion:'.panels'
        },
        onRender:function(){
            var tabs = new Juggler.Widgets.Tabs({
                collection:this.collection
            });
            var panels = new Juggler.Widgets.Panels({
                collection:this.collection
            });
            this.tabsRegion.show(tabs);
            this.panelsRegion.show(panels);
        }
    });

});