Juggler.module('Widgets', function(Widgets, Juggler, Backbone, Marionette, $, _) {

    Widgets.Alert = Juggler.Views.ItemView.extend({
        className:'alert alert-dismissable fade in animated juggler-alert',
        template:Juggler.Templates.alert,
        options:{
            type:'warning',
            message:'',
            zIndex:9999,
            delay:3000
        },
        events:{
            'close.bs.alert':'onClose'
        },
        initialize:function(){
            var that = this;
            if(this.options.delay){
                _.delay(function(){
                    that.$el.alert('close');
                },this.options.delay);
            }
        },
        templateHelpers:function(){
            return this.options;
        },
        onRender:function(options){
            this.$el.addClass('alert-'+this.options.type)
                .attr('z-index',this.serializeData().zIndex);
        },
        onShow:function(){
            this.$el.css('margin-left',-this.$el.outerWidth()/2+'px');
        },
        onClose:function(e){
            this.destroy();
        }
    });

    Widgets.Progressbar = Marionette.ItemView.extend({
        className:'progress progress-striped active juggler-progress',
        template:_.template('<div class="progress-bar"></div>'),
        options:{
            type: 'success'
        },
        ui:{
            bar:'.progress-bar'
        },
        modelEvents:{
            'progress':'onProgress'
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

    Widgets.Dialog = Juggler.Views.LayoutView.extend({
        className:'modal fade',
        template:Juggler.Templates.dialog,
        options:{
            type:'success',
            size:'md',
            title:'',
            body:'',
            buttons:{
                'positive':{},
                'negative':{}
            },
            backdrop:'static'
        },
        ui:{
            header:'.modal-title',
            body:'.modal-body',
            footer:'.modal-footer'
        },
        get:function(key){
            return this.serializeData()[key];
        },
        set:function(key, value){
            this[key+'Region'].close();
            this.model?this.model.set(key,value):(this.options[key]=value,this.ui[key].html(value));
            value?this.ui[key].show():this.ui[key].hide();
        },
        templateHelpers:function(){
            return this.options;
        },
        onRender:function(){
            this.get('header')?this.ui.header.show().html(this.get('header')):this.ui.header.hide();
            this.get('footer')?this.ui.footer.show().html(this.get('footer')):this.ui.footer.hide();
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

    Widgets.Tooltip = Juggler.Views.ItemView.extend({
        className:function(){
            return ['tooltip',this.serializeData.placement].join(' ')
        },
        template:_.template('<div class="tooltip-arror"></div>\
            <div class="tooltip-inner"><%- content %></div>'),
        options:{
            placement:'top',
            content:''
        }
    });

    Widgets.Popover = Juggler.Views.ItemView.extend({
        className:function(){
            return ['popover',this.serializeData.placement].join(' ')
        },
        template:_.template('<div class="tooltip-arror"></div>\
            <div class="popover-title"><%- title %></div>\
            <div class="popover-content"><%= content %></div>'),
        options:{
            placement:'top',
            title:'',
            content:''
        }
    });

});