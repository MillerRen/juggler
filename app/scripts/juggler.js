(function(root, factory) {
    
    if (typeof define === 'function' && define.amd) {
        define(['marionette', 'backbone', 'underscore'], function(Marionette, Backbone, _) {
            return (root.Juggler = factory(root, Marionette, Backbone, _));
        });
    } else if (typeof exports !== 'undefined') {
        var Marionette = require('marionette');
        var Backbone = require('backbone');
        var _ = require('underscore');
        module.exports = factory(root, Marionette, Backbone, _);
    } else {
        root.Juggler = factory(root, root.Marionette, root.Backbone, root._);
    }

}(this, function(root, Marionette, Backbone, _) {
    'use strict';
    
    
    
    var previousJuggler = root.Juggler;
    
    var Juggler = Backbone.Juggler = new Marionette.Application();
    
    Juggler.VERSION = '0.0.0';
    
    Juggler.noConflict = function() {
        root.Juggler = previousJuggler;
        return this;
    };
    
    Backbone.Juggler = Juggler;
    
    
    Backbone.ajaxSync = Backbone.sync;
    
    Backbone.sync = function Sync(method, model, options) {
        var xhr = Backbone.ajaxSync.apply(this, arguments);
        
        Juggler.vent.trigger('syncStart', model);
        
        xhr.done(function(data) {
            model.trigger('done', data);
            Juggler.vent.trigger('syncDone', data);
        })
        .fail(function(data) {
            model.trigger('fail', data);
            Juggler.vent.trigger('syncFail', model, data);
        })
        .progress(function(data) {
            model.trigger('progress', model, data);
            Juggler.vent.trigger('syncProgress', model, data);
        })
        .complete(function(data) {
            model.trigger('complete', model, data);
            Juggler.vent.trigger('syncComplete');
        });
        
        return xhr;
    };
    
    
    
    Juggler.module('Config', function(Config, Juggler, Backbone, Marionette, $, _) {
        
        Config.Message = {
        
        };
        
        Config.BaseUrl = 'http://localhost:9000';
    });
    
    Juggler.module('Templates', function(Templates, Juggler, Backbone, Marionette, $, _) {
        
        Templates.layout = function(data) {
            var $el = $('<div>');
            $.each(data.regions, function(key, value) {
                var $item = $('<div>');
                if (value.indexOf('#') == 0)
                    $item.attr('id', value.replace('#', ''));
                else if (value.indexOf('.') == 0)
                    $item.addClass(value.split('.').join(' '));
                $el.append($item);
            });
            
            return $el.html();
        };
        
        Templates.dialog = _.template('<div class="modal-dialog">\
                <div class="modal-content">\
                    <div class="modal-header">\
                     <button type="button" class="close" data-dismiss="modal">\
                     <span aria-hidden="true">&times;</span>\
                     <span class="sr-only">Close</span></button>\
                     <h4 class="modal-title"><%= title %></h4>\
                    </div>\
                    <div class="modal-body"><%= content %></div>\
                    <div class="modal-footer"></div>\
                </div>\
            </div>');
       
        Templates.alert = _.template('<button type="button" class="close" data-dismiss="alert">\
                <span aria-hidden="true">&times;</span>\
                <span class="sr-only">Close</span>\
            </button>\
            <span class="alert-message">\
                <%= message %>\
            </span>');

    });
    
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
            template: Juggler.Templates.layout,
            onRender: function() {
                var that = this, 
                regions = Marionette.getOption(this, 'regions');
                
                this.addRegions(regions);
                this.$el.find('[id]').each(function(i, item) {
                    var id = $(item).attr('id');
                    if (id)
                        that.addRegion(id, '#' + id);
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
    
    Juggler.module('Common', function(Common, Juggler, Backbone, Marionette, $, _) {
        
        Common.Dialog = Juggler.Views.Layout.extend({
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
        
        Common.Notice = Juggler.Views.ItemView.extend({
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
        
        Common.Progressbar = Marionette.ItemView.extend({
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
        
    });
    

    
    Juggler.module('Widgets', function(Widgets, Juggler, Backbone, Marionette, $, _) {
        
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
    
    });
    
    Juggler.module('Components', function(Components, Juggler, Backbone, Marionette, $, _) {
        
        Components.Navbar = Juggler.Views.CompositeView.extend({
            
        });
        
    });
    
    
    Juggler.module('Enities', function(Enities, Juggler, Backbone, Marionette, $, _) {
        
        Enities.Model = Backbone.Model.extend({
            api: '/test',
            silent: true,
            message: Juggler.Message,
            parse: function(res, options) {
                return options.collection ? resp : resp.data;
            },
            url:function(){
                return Juggler.Config.BaseUrl + this.url;
            }
        });
        
        Enities.Collection = Backbone.Collection.extend({
            api:'/test',
            silent:true,
            message: Juggler.Message,
            url:function(){
                return Juggler.Config.BaseUrl + this.url;
            }
        });
        
    });
    
    
    
    Juggler.addInitializer(function() {        
        
        
    
    });
    
    
    Juggler.addInitializer(function() {
        
        Juggler.vent.on('syncStart', function(model, data) {
            if (model.silent)
                return;
            
        });
        
        Juggler.vent.on('syncDone', function(model, data) {
            if (model.silent)
                return;
            
            Juggler.Common.Notify(model.message.SYNC_DONE);
        });
        
        Juggler.vent.on('syncFail', function(model, data) {
            if (model.silent)
                return;
            
            Juggler.Common.Notify(model.message.SYNC_FAIL, {
                animate: {
                    enter: 'animated shake',
                    exit: 'animated shake'
                }
            });
        });
        
        Juggler.vent.on('syncProgress', function(model, data) {
            if (model.silent)
                return;
            
        });
    
    });
    
    
    Juggler.addInitializer(function() {
        
        Juggler.addRegions({
            headerRegion: '#header',
            mainRegion: '#main',
            footerRegion: '#footer',
            notifyRegion: '#notify',
            dialogRegion: '#dialog'
        })
    
    });
    
    
    Juggler.on('start', function() {
        
        if (Backbone.history)
            Backbone.history.start();
    
    });
    
    
    return Juggler;
}));
