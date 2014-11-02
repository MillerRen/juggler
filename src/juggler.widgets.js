Juggler.module('Widgets', function(Widgets, Juggler, Backbone, Marionette, $, _) {

    Widgets.Dialog = Juggler.Views.LayoutView.extend({
        className:'modal fade',
        template:Juggler.Templates.dialog,
        defaults:{
            type:'success',
            title:'',
            content:'',
            buttons:{
                'positive':{},
                'negative':{}
            },
            backdrop:'static'
        },
        ui:{
            header:'.modal-header',
            body:'.modal-body',
            footer:'.modal-footer'
        },
        regions:{
            headerRegion:'.modal-header',
            bodyRegion:'.modal-body',
            footerRegion:'.modal-footer'
        },
        onRender:function(){
            this.ui.header.addClass('alert alert-'+this.options.type);
            if(!this.options.buttons){
                this.ui.footer.remove()
                return;
            }
        },
        onShow:function(){
            this.$el.modal(this.options);
        },
        onClose:function(){
            this.$el.modal('destroy');
        }
    });

    Widgets.Notice = Juggler.Views.ItemView.extend({
        className:'alert alert-dismissable fade in animated juggler-alert',
        template:Juggler.Templates.alert,
        defaults:{
            type:'warning'
        },
        events:{
            'close.bs.alert':'onClose'
        },
        initialize:function(options){
            this.$el.addClass('alert-'+options.type);
        },
        serializeData:function(){
            return this.options;
        },
        onShow:function(){
            this.$el.css('margin-left',-this.$el.outerWidth()/2+'px');
            this.$el.addClass('bounceInDown')
        },
        onClose:function(e){
            this.destroy();
        }
    });

    Widgets.Progressbar = Marionette.ItemView.extend({
        className:'progress progress-striped active juggler-progress',
        template:_.template('<div class="progress-bar"></div>'),
        defaults:{
            type: 'success'
        },
        ui:{
            bar:'.progress-bar'
        },
        modelEvents:{
            'progress':'onProgress'
        },
        initialize:function(options){
            this.options = _.defaults(options,Marionette.getOption(this, 'defaults'));
        },
        progress:function(progress){
            progress = progress<0?0:progress;
            progress = progress>100?100:progress;
            if(progress>=100)
               return this.destroy();
            this.ui.bar.css('width',progress+'%');
        },
        onRender:function(){
            this.ui.bar.addClass('progress-bar-'+this.options.type);
        },
        onProgress:function(progress){
            this.progress(progress);
        }
    });

    Widgets.GroupItem = Juggler.Views.ListItemView.extend({
        className: 'list-group-item'
    });

    Widgets.GroupList = Juggler.Views.ListView.extend({
        className: 'list-group',
        childView: Widgets.GroupItem
    });

    Widgets.Tabs = Juggler.Views.ListView.extend({
        className: 'nav nav-tabs'
    });

    Widgets.Pills = Juggler.Views.ListView.extend({
        className: 'nav nav-pills'
    });

    Widgets.Stack = Juggler.Views.ListView.extend({
        className: 'nav nav-pills nav-stacked'
    });

    Widgets.Nav = Juggler.Views.ListView.extend({
        className: 'nav navbar-nav'
    });

    Widgets.Breadcrumb = Juggler.Views.ListView.extend({
       className: 'breadcrumb' 
    });

    Widgets.Navbar = Juggler.Views.ListView.extend({
        className:'navbar navbar-static-top navbar-default',
        tagName:'div',
        childViewContainer:'.navbar-nav-primary',
        template:Juggler.Templates.navbar,
        defaults:{
            brand:'Home'
        },
        serializeData:function(){
            return this.options;
        }
    });

    Widgets.DropdownMenu = Juggler.Views.ListItemView.extend({
       className:'dropdown-menu' 
    });

    Widgets.Pagination = Juggler.Views.ListItemView.extend({
        className:'pagination'
    });

    Widgets.MediaList = Juggler.Views.ListItemView.extend({
        className:'media-list'
    });

    Widgets.Td = Juggler.Views.ItemView.extend({
        tagName:'td',
        template:_.template('<%= name %>')
    });

    Widgets.Tr = Juggler.Views.CompositeView.extend({
        tagName:'tr',
        childView:Widgets.Td,
        initialize:function(options){
            this.collection = this.collection || Juggler.Enities.model_to_collection(this.model);
        }
    });

    Widgets.Table = Juggler.Views.CompositeView.extend({
        tagName:'table',
        className:'table',
        childView:Widgets.Tr,
        childViewContainer:'tbody',
        template:_.template('<thead></thead><tbody></tbody><tfoot></tfoot>'),

    });

    Widgets.GridLayout = Juggler.Views.LayoutView.extend({
        
    });

});