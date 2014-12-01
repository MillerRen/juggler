Juggler.module('Widgets', function(Widgets, Juggler, Backbone, Marionette, $, _) {

    Widgets.Button = Widgets.ListItem.extend({
        tagName:'button',
        template:_.template('<i class="<%- icon %>"/> <span><%- name %></span>'),
        onRender:function(){
            var data = this.serializeData();
            var type = 'btn-'+data.type;
            var size = 'btn-'+data.size;
            var className = ['btn',type,size].join(' ');
            this.$el.attr('class',className);
        }
    });

    Widgets.Buttons = Widgets.List.extend({
        tagName:'div',
        childView:Widgets.Button
    });

    Widgets.ButtonGroup = Juggler.Views.CompositeView.extend({
        className:'btn-group',
        childView:Widgets.Button
    });

    Widgets.Toolbar = Juggler.Views.CompositeView.extend({
        className:'btn-toolbar',
        childView:Widgets.ButtonGroup,
        childViewOptions:function(model,index){
            return {collection:new Juggler.Enities.ButtonGroup(model.values())}
        }
    });

});