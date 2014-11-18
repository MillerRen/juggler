Juggler.module('Widgets', function(Widgets, Juggler, Backbone, Marionette, $, _) {

    Widgets.Th = Juggler.Views.ItemView.extend({
        tagName:'th',
        template:_.template('<%- value %>')
    });

    Widgets.Td = Juggler.Views.ItemView.extend({
        tagName:'td',
        template:_.template('<%= value %>'),
        events:{
            'click':'onClick'
        },
        serializeData:function(){
            var origin=Widgets.Td.__super__.serializeData.apply(this,arguments);
            return _.extend(origin,{value:this.options.parentModel.get(this.model.get('name'))});
        }
    });

    Widgets.Tr = Juggler.Views.CompositeView.extend({
        tagName:'tr',
        childView:Widgets.Td
    });

    Widgets.Thead = Juggler.Views.CompositeView.extend({
        tagName:'tr',
        childView:Widgets.Th
    });

    Widgets.Tbody = Juggler.Views.CompositeView.extend({
        tagName:'tbody',
        childView:Widgets.Tr,
        childViewOptions:function(){
            return {collection:this.options.columns}
        }
    });

    Widgets.Table = Juggler.Views.LayoutView.extend({
        tagName:'table',
        className:'table table-hover table-striped table-bordered',
        childView:Widgets.Tr,
        childViewContainer:'tbody',
        regions:{
            theadRegion:'thead',
            tbodyRegion:'tbody',
            tfootRegion:'tfoot'
        },
        template:_.template('<thead></thead><tbody></tbody><tfoot></tfoot>'),
        initialize:function(){
            this.head = new Widgets.Thead({
                collection:this.options.columns,
                parent:this
            });
            this.body = new Widgets.Tbody({
                collection:this.collection,
                columns:this.options.columns
            });
            this.tbodyRegion.attachHtml = function(view){
                this.$el.replaceWith(view.$el)
            };
        },
        onRender:function(){
            this.theadRegion.show(this.head);
            this.tbodyRegion.show(this.body);
        }
    });

});