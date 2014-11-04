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
                //<%= message %>\
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
        
        Enities.model_to_collection = function(model, name, value, Collection){
            Collection = Collection||Enities.Collection;
            name = name||'name';
            value = value||'label';
            return new Collection(
                _.map(model.toJSON(), function(item,i){
                    var data = {};
                    data[name]=item;
                    data[value]=i;
                    
                    return data;
                })
            );
        };
        
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
    
        Enities.Cell = Enities.Model.extend({
    
        });
    
        Enities.Row = Enities.Collection.extend({
            model:Enities.Cell
        });
    
        Enities.Column = Enities.Model.extend({
            defaults: {
                name: undefined,
                label: undefined,
                sortable: false,
                editable: false,
                renderable: true,
                formatter: undefined,
                sortType: "cycle",
                sortValue: undefined,
                direction: null,
                cell: undefined,
                headerCell: undefined
            }
        });
    
        Enities.Columns = Enities.Collection.extend({
            model:Enities.Column
        });
    
    });

    Juggler.module('Views', function(Views, Juggler, Backbone, Marionette, $, _) {
        
        Views.ItemView = Marionette.ItemView.extend({
            template: _.template(''),
            serializeData: function() {
                return Views.ItemView.__super__.serializeData.apply(this,arguments)||this.options;
            }
        });
    
        Views.EmptyView = Views.ItemView.extend({
            className: 'alert alert-warning',
            template: _.template('<%= text %>'),
            defaults: {text: 'not found！'}
        });
    
        Views.LayoutView = Marionette.LayoutView.extend({
            className:'row',
            regionAttr:'data-region',
            template: _.template(''),
            render: function() {
                Views.LayoutView.__super__.render.apply(this,arguments);
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
                return Views.LayoutView.__super__.serializeData.apply(this,arguments)||this.options;
            }
        });
    
        Views.CompositeView = Marionette.CompositeView.extend({
            emptyView: Views.EmptyView,
            childViewContainer: "",
            template: _.template(''),
            childViewOptions:function(){
                return {
                    parentModel:this.model,
                    collection:this.collection
                };
            }
        });
    
        Views.ListItemView = Views.ItemView.extend({
            tagName: 'li',
            template: _.template('<a data-target="#<%- name %>" data-toggle="tab"><%- label %></a>'),
            triggers:{
               'click a':'click' 
            }
        });
    
        Views.ListView = Views.CompositeView.extend({
            tagName: 'ul',
            template: _.template(''),
            childView: Views.ListItemView,
            childEvents:{
              'click':'onClick'  
            },
            onClick:function(view){
              Backbone.history.navigate(view.model.get('name')); 
            }
        });
    
    
    });

    Juggler.module('Widgets', function(Widgets, Juggler, Backbone, Marionette, $, _) {
    
        Widgets.Dialog = Juggler.Views.LayoutView.extend({
            className:'modal fade',
            template:Juggler.Templates.dialog,
            options:{
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
            options:{
                type:'warning',
                message:'message'
            },
            events:{
                'close.bs.alert':'onClose'
            },
            initialize:function(options){
                this.$el.addClass('alert-'+this.options.type);
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
    
        Widgets.GroupList = Juggler.Views.ListView.extend({
            className: 'list-group',
            childView: Juggler.Views.ListItemView.extend({
                className: 'list-group-item'
            })
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
            tagName:'div',
            template:Juggler.Templates.navbar,
            childViewContainer:'.navbar-nav-primary',
            className:'navbar navbar-static-top navbar-default',
            options:{
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
    
        Widgets.Th = Juggler.Views.ItemView.extend({
            tagName:'th',
            template:_.template('<%= label %>')
        });
    
        Widgets.Td = Juggler.Views.ItemView.extend({
            tagName:'td',
            template:_.template('<%= text %>'),
            serializeData:function(){
                return {text:this.options.tr.model.get(this.model.get('name'))};
            }
        });
    
        Widgets.Tr = Juggler.Views.CompositeView.extend({
            tagName:'tr',
            childView:Widgets.Td,
            childViewOptions:function(){
                return {tr:this}
            }
        });
    
        Widgets.Thead = Widgets.Tr.extend({
            childView:Widgets.Th
        });
    
        Widgets.Tbody = Juggler.Views.CompositeView.extend({
            childView:Widgets.Tr,
            childViewOptions:function(){
                return {collection:this.options.columns}
            }
        });
    
        Widgets.Table = Juggler.Views.LayoutView.extend({
            tagName:'table',
            className:'table table-hover table-striped',
            childView:Widgets.Tr,
            childViewContainer:'tbody',
            template:_.template('<thead></thead><tbody></tbody><tfoot></tfoot>'),
            regions:{
                theadRegion:'thead',
                tbodyRegion:'tbody',
                tfootRegion:'tfoot'
            },
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
                    this.$el.html(view.$el.html())
                };
            },
            onRender:function(){
                this.theadRegion.show(this.head);
                this.tbodyRegion.show(this.body);
            }
        });
    
        Widgets.GridLayout = Juggler.Views.LayoutView.extend({
            className:'grid-layout',
            template:function(data){
                var tdata = data.items||[data],
                    tpl =  _.map(tdata,function(region,r){
                    var columns = _.map(region,function(item,i){
                        var className,t,region_name;
                        region_name = !_.isNaN(Number(i))?'col-'+i:i;
                        className = _.map(item,function(item2,i2){
                                    return _.isObject(item2)?_.map(item2,function(item3,i3){
                                        return 'col-'+i2+'-'+i3+(item3?'-'+item3:'');
                                    }).join(' '):'col-'+i2+'-'+item2;
                                }).join(' ');
                        return '<div class="'+className+'" data-region="'+region_name+'"></div>';
                        
                    }).join('');
                    return '<div class="row">'+columns+'</div>'
                }).join('');
                return tpl;
            }
    
        });
    
        Widgets.FormRow = Juggler.Views.ItemView.extend({
            className:'form-group',
            template:Juggler.Templates.form_row
        });
        
        Widgets.Form = Juggler.Views.CompositeView.extend({
            tagName:'form',
            childView:Widgets.FormRow
        });
    
    
    });

    Juggler.module('Editors', function(Editors, Juggler, Backbone, Marionette, $, _) {
    
        
    
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

    Juggler.addInitializer(function() {
    
        Juggler.addRegions({
            headerRegion: '#header',
            navRegion: '#nav',
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
