Juggler.module('Widgets', function(Widgets, Juggler, Backbone, Marionette, $, _) {

    Widgets.Dialog = Juggler.Views.Layout.extend({
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

    Widgets.GroupItem = Juggler.Views.Item.extend({
        className: 'list-group-item'
    });

    Widgets.ListGroup = Juggler.Views.List.extend({
        className: 'list-group',
        childView: Widgets.GroupItem
    });

    Widgets.Tabs = Juggler.Views.List.extend({
        className: 'nav nav-tabs'
    });

    Widgets.Pills = Juggler.Views.List.extend({
        className: 'nav nav-pills'
    });

    Widgets.Stack = Juggler.Views.List.extend({
        className: 'nav nav-pills nav-stacked'
    });

    Widgets.Nav = Juggler.Views.List.extend({
        className: 'nav navbar-nav'
    });

    Widgets.Navbar = Juggler.Views.List.extend({
        className:'navbar navbar-static-top navbar-default',
        tagName:'div',
        childViewContainer:'.navbar-nav-primary',
        template:Juggler.Templates.navbar,
        defaults:{
            brand:'Home'
        },
        childEvents:{
          'click':'onClick'  
        },
        onClick:function(view){
          Backbone.history.navigate(view.model.get('value')); 
        },
        serializeData:function(){
            return this.options;
        }
    });

});