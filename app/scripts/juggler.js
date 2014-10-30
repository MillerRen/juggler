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
    
    Juggler.module('Config', function(Config, Juggler, Backbone, Marionette, $, _) {
    
        Config.Message = {
            //test:''
        };
    
    });

    Juggler.module('Templates', function(Templates, Juggler, Backbone, Marionette, $, _) {
    
        Templates.dialog = _.template('<div class="modal-dialog">\
                <div class="modal-content">\
                    <div class="modal-header">\
                     <button type="button" class="close" data-dismiss="modal">\
                     <span aria-hidden="true">&times;</span>\
                     <span class="sr-only">Close</span></button>\
                     <h4 class="modal-title"><%= title %></h4>\
                    </div>\
                    <div class="modal-body"><%= content %></div>\
                    <div class="modal-footer">\
                    <button class="btn btn-primary">确定</button>\
                    </div>\
                </div>\
            </div>');
    
        Templates.alert = _.template('<button type="button" class="close" data-dismiss="alert">\
                <span aria-hidden="true">&times;</span>\
                <span class="sr-only">Close</span>\
            </button>\
            <span class="alert-message">\
                <%= message %>\
            </span>');
    
        Templates.form = _.template('');
    
        Templates.form_row = _.template(
            '<label class="col-md-2 contorl-label"><%- label %></label>\
            <div class="col-md-10"></div>\
            ');
        
        Templates.navbar = _.template('<div class="container">\
                  <div class="navbar-header">\
                    <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-collapse">\
                      <span class="sr-only">Toggle navigation</span>\
                      <span class="icon-bar"></span>\
                      <span class="icon-bar"></span>\
                      <span class="icon-bar"></span>\
                    </button>\
                    <a class="navbar-brand" href="#"><%= brand %></a>\
                  </div>\
                  <div class="collapse navbar-collapse" id="navbar-collapse" data-region="navbar">\
                    <ul class="nav navbar-nav navbar-nav-primary"></ul>\
                    <ul class="nav navbar-nav navbar-nav-secondary"></ul>\
                  </div>\
                </div>');
    
    });

    Juggler.module('Enities', function(Enities, Juggler, Backbone, Marionette, $, _) {
    
        Enities.Model = Backbone.RelationalModel.extend({
            urlRoot: '/test',
            message: Juggler.Config.Message,
            parse: function(resp, options) {
                return options.collection ? resp : resp.data;
            },
            index:function(){
                return this.collection.indexOf(this);
            },
            prev:function(){
                return this.collection.at(this.index()-1);
            },
            next:function(){
                return this.collection.at(this.index()+1);
            }
        });
    
        Enities.Collection = Backbone.Collection.extend({
            url:'/test',
            message: Juggler.Config.Message,
            parse: function(resp, options) {
                return options.collection ? resp : resp.data;
            }
        });
    
    });

    Juggler.module('Views', function(Views, Juggler, Backbone, Marionette, $, _) {
        
        Views.ItemView = Marionette.ItemView.extend({
            constructor: function(options) {
                _.defaults(this.options,this.defaults);
                Marionette.ItemView.prototype.constructor.apply(this, arguments);
            },
            template: _.template(''),
            serializeData: function() {
                return this.model?this.model.toJSON():this.options;
            }
        });
    
        Views.EmptyView = Views.ItemView.extend({
            className: 'alert alert-warning',
            template: Juggler.Templates.empty,
            defaults: {text: 'not found！'}
        });
    
        Views.Layout = Marionette.LayoutView.extend({
            className:'row',
            regionAttr:'data-region',
            template: _.template(''),
            constructor: function(options) {
                _.defaults(this.options,this.defaults);
                Marionette.LayoutView.apply(this, arguments);
            },
            render: function() {
                Views.Layout.__super__.render.apply(this,arguments);
                this.resolveTemplateRegions();
            },
            resolveTemplateRegions:function(){
                var that = this,
                    regionAttr = this.regionAttr,
                    region_selector = '['+regionAttr+']';
                this.$el.find(region_selector)
                .each(function(i, item) {
                    var region = $(item).attr(regionAttr);
                    region&&that.addRegion($.camelCase(region)+'Region', '['+regionAttr+'='+region+']');
                });
                this.triggerMethod('resoveregion');
            },
            serializeData: function() {
                return this.model?this.model.toJSON():this.options;
            }
        });
    
        Views.CompositeView = Marionette.CompositeView.extend({
            constructor: function(options) {
                Views.CompositeView.__super__.constructor.apply(this, arguments);
                _.defaults(this.options,this.defaults);
            },
            emptyView: Views.ItemView,
            childViewContainer: "",
            template: _.template(''),
            getChildView: function(item) {
                return Views[item.get('viewType')] || Marionette.getOption(this, "childView") || this.constructor;
            }
        });
    
        Views.Item = Views.ItemView.extend({
            tagName: 'li',
            template: _.template('<a data-target="#<%- value %>" data-toggle="tab"><%- name %></a>'),
            triggers:{
               'click a':'click' 
            }
        });
    
    
    
        Views.List = Views.CompositeView.extend({
            tagName: 'ul',
            template: _.template(''),
            childView: Views.Item
        });
    
    
    });

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
    
        Widgets.Breadcrumb = Juggler.Views.List.extend({
           className: 'breadcrumb' 
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

    Juggler.module('Components', function(Components, Juggler, Backbone, Marionette, $, _) {
    
        Components.FormRow = Juggler.Views.ItemView.extend({
            className:'form-group',
            template:Juggler.Templates.form_row
        });
        
        Components.Form = Juggler.Views.CompositeView.extend({
            tagName:'form',
            childView:Components.FormRow
        });
    
        
    
    });

    Juggler.module('Editors', function(Editors, Juggler, Backbone, Marionette, $, _) {
    
        
    
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
