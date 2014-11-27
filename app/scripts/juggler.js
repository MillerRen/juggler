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

    Juggler.AppRouter = Marionette.AppRouter.extend({

    });

    Juggler.Controller = Marionette.Controller.extend({
        
    });
    
    Juggler.module('Config', function(Config, Juggler, Backbone, Marionette, $, _) {
    
        Config.Message = {
            NET_ERROR:'Network error!',
            NET_SUCCESS:'Network success!'
        };
    
    });

    Juggler.module('Templates', function(Templates, Juggler, Backbone, Marionette, $, _) {
    
        Templates.dialog = _.template('<div class="modal-dialog">\
                <div class="modal-content">\
                    <div class="modal-header alert alert-<%- type %>">\
                     <button type="button" class="close" data-dismiss="modal">\
                     <span aria-hidden="true">&times;</span>\
                     <span class="sr-only">Close</span></button>\
                     <h4 class="modal-title"><%= title %></h4>\
                    </div>\
                    <div class="modal-body"><%= body %></div>\
                    <div class="modal-footer">\
                    <button class="btn btn-primary"></button>\
                    </div>\
                </div>\
            </div>');
    
        Templates.alert = _.template(
        '<button type="button" class="close" data-dismiss="alert">\
            <span aria-hidden="true">&times;</span>\
            <span class="sr-only">Close</span>\
        </button>\
        <span class="alert-message">\
            <%= message %>\
        </span>');
    
        Templates.form = _.template(
        '<div class="fields"></div>\
            <div class="form-group">\
            <div class="col-md-10 col-md-offset-2">\
                <button type="submit" class="btn btn-success btn-submit col-md-2 hidden"></button>\
            </div>\
        </div>');
    
        Templates.form_row = _.template(
        '<label class="col-md-2 control-label" for="<%- cid %>"><%- label %></label>\
        <div class="col-md-10">\
            <div class="control-field"></div>\
            <span class="glyphicon form-control-feedback"></span>\
            <span class="help-block"><%- errors %></span>\
        </div>\
        ');
        
        Templates.navbar = _.template('<div class="<%- container %>">\
          <div class="navbar-header">\
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-collapse">\
              <span class="sr-only">Toggle navigation</span>\
              <span class="icon-bar"></span>\
              <span class="icon-bar"></span>\
              <span class="icon-bar"></span>\
            </button>\
            <div class="navbar-brand"><%= brand %></div>\
          </div>\
          <div class="collapse navbar-collapse" id="navbar-collapse" data-region="navbar">\
            <div class="navbar-nav-primary navbar-left">\
              <ul class="nav navbar-nav"></ul>\
            </div>\
            <form class="navbar-form navbar-left"></form>\
            <div class="navbar-nav-secondary navbar-right"></div>\
          </div>\
        </div>'
        );
    
        Templates.panel = _.template(
            '<div class="panel-heading"><%= header %></div>\
            <div class="panel-body"><%= body %></div>\
            <div class="panel-footer"><%= footer %></div>'
        );
    
        Templates.carousel = _.template(
        '<div id="<%- id %>" class="carousel slide" data-ride="carousel">\
          <ol class="carousel-indicators">\
            <% _.each(collection,function(item,i){ %>\
            <li data-target="<%- id %>" data-slide-to="<%- i %>" class="active"></li>\
            <% }); %>\
          </ol>\
          <div class="carousel-inner" role="listbox"></div>\
          <a class="left carousel-control" href="#<%- id %>" role="button" data-slide="prev">\
            <span class="glyphicon glyphicon-chevron-left"></span>\
            <span class="sr-only">Previous</span>\
          </a>\
          <a class="right carousel-control" href="#<%- id %>" role="button" data-slide="next">\
            <span class="glyphicon glyphicon-chevron-right"></span>\
            <span class="sr-only">Next</span>\
          </a>\
        </div>');
    
    });

    Juggler.module('Enities', function(Enities, Juggler, Backbone, Marionette, $, _) {
        
        Enities.Model = Backbone.Model.extend({
            urlRoot: '/test',
            message: Juggler.Config.Message,
            parse: function(resp, options) {
                return options.collection ? resp : resp.data;
            },
            index:function(){
                return this.collection.indexOf(this);
            },
            reset:function(){
                this.clear().set(this.defaults);
            }
        });
    
        Enities.Collection = Backbone.Collection.extend({
            url:'/test',
            model:Enities.Model,
            parse: function(resp, options) {
                return options.collection ? resp : resp.data;
            },
            up: function(model) {
              var index = this.indexOf(model);
              if (index > 0){
                this.swap(index, index-1);
              }
            },
            down: function(model) {
              var index = this.indexOf(model);
              if (index < this.models.length) {
                this.swap(index, index+1);
              }
            },
            swap: function (indexA, indexB) {
              this.models[indexA] = this.models.splice(indexB, 1, this.models[indexA])[0];
            },
            next:function(model){
                var index = this.indexOf(model);
                return this.at(index+1);
            },
            prev:function(model){
                var index = this.indexOf(model);
                return this.at(index-1);
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
                readonly:true,
                cell: undefined,
                headerCell: undefined
            }
        });
    
        Enities.Columns = Enities.Collection.extend({
            model:Enities.Column
        });
    
        Enities.Field = Enities.Model.extend({
           defaults:{
               label:'label',
               editor:'input',
               errors:[]
           },
           validation:function(){
               return {value:this.get('validator')||{}};
           }
        });
    
        Enities.Fields = Enities.Collection.extend({
            model:Enities.Field
        });
    
        Enities.Form = Enities.Model.extend({
            
        });
    
        Enities.Button = Enities.Model.extend({
            defaults:{
                'type':'default',
                'name':'',
                'icon':'',
                'size':''
            }
        });
    
        Enities.Toolbar = Enities.Collection.extend({});
    
        Enities.ButtonGroup = Enities.Collection.extend({
            model:Enities.Button
        });
    
    });

    Juggler.module('Views', function(Views, Juggler, Backbone, Marionette, $, _) {
        
        Views.ItemView = Marionette.ItemView.extend({
            template: _.template(''),
            serializeData: function() {
                var data = Views.ItemView.__super__.serializeData.apply(this,arguments);
                return data||this.options;
            }
        });
    
        Views.EmptyView = Views.ItemView.extend({
            className: 'alert alert-warning',
            template: _.template('<%= text %>'),
            options: {text: 'not found！'}
        });
    
        Views.LayoutView = Marionette.LayoutView.extend({
            className:'row',
            regionAttr:'data-region',
            template: _.template(''),
            render: function() {
                this.resolveUIRegions();
                Views.LayoutView.__super__.render.apply(this,arguments);
                this.resolveTemplateRegions();
            },
            resolveUIRegions:function(){
                if(!this.ui)return;
                for(var i in this.ui){
                    this.addRegion(i+'Region',this.ui[i])
                }
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
            serializeData:function(){
                var data = Views.LayoutView.__super__.serializeData.apply(this,arguments);
                return data||this.options;
            }
        });
    
        Views.CompositeView = Marionette.CompositeView.extend({
            childViewContainer: "",
            template: _.template(''),
            childViewOptions:function(model,index){
                var options =  {index:index};
                this.model&&(options.parentModel=this.model);
                return options;
            },
            serializeData: function() {
                var data = Views.CompositeView.__super__.serializeData.apply(this,arguments);
                return data||this.options;
            }
        });
    
    
    });

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

    Juggler.module('Widgets', function(Widgets, Juggler, Backbone, Marionette, $, _) {
        
        Widgets.ListItem = Juggler.Views.ItemView.extend({
            tagName: 'li',
            template: _.template('<a href="#"><%- label %></a>'),
            triggers:{
               'click a':'click' 
            },
        });
    
        Widgets.List = Juggler.Views.CompositeView.extend({
            tagName: 'ul',
            template: _.template(''),
            childView: Widgets.ListItem,
            getChildView:function(model){
                return !_.isEmpty(model.get('items'))?Widgets.DropdownMenu:Widgets.List.__super__.getChildView.apply(this,arguments);
            },
            childEvents:{
              'click':'onClick'  
            },
            onClick:function(view){
              Backbone.history.navigate(view.model.get('name'),{trigger:true}); 
            }
        });
    
        Widgets.DropdownMenu = Widgets.List.extend({
            className:'dropdown',
            tagName: 'li',
            childViewContainer:'.dropdown-menu',
            template: _.template('<a class="dropdown-toggle" data-toggle="dropdown" href="#"><%- label %>\
            <span class="caret"></span></a><ul class="dropdown-menu"></ul>'),
            triggers:{
               'click a':'click'
            },
            ui:{
                toggle:'.dropdown-toggle'
            },
            onRender:function(){
                this.ui.toggle.dropdown();
            }
        });
    
        Widgets.GroupList = Widgets.List.extend({
            className: 'list-group',
            childView: Widgets.ListItem.extend({
                className: 'list-group-item'
            }),
            childViewOptions:function(){
                var options = Widgets.GroupList.__super__.childViewOptions.apply(this,arguments);
                return _.extend(options,{className:'list-group-item'})
            }
        });
    
        Widgets.Tabs = Widgets.List.extend({
            className: 'nav nav-tabs',
            childView:Widgets.ListItem.extend({
                template:_.template('<a data-toggle="tab" data-target="#<%- name %>"><%- label %></a>')
            }),
            collectionEvents:{
                'change':'onChange'
            },
            initialize:function(){
                this._actived = this.serializeData().active||0;
            },
            active:function(index){
                this.collection.at(this._actived).unset('active');
                this.collection.at(index).set('active',true);
                this._actived = index;
            },
            onRender:function(){
                this.active(this._actived);
            },
            onClick:function(view){
                this.active(view.model.index());
            },
            onChange:function(model){
                var index = model.index();
                this.$el.find('a').eq(index).tab('show');
            }
        });
    
        Widgets.TabsContent = Juggler.Views.CompositeView.extend({
            className:'tab-content',
            childView:Juggler.Views.ItemView.extend({
                className:function(){
                    return 'tab-pane '+(this.serializeData().active?'active':'');
                },
                attributes:function(){
                    return {id:this.model.get('name')}
                },
                template:_.template('<%= content %>')
            })
        });
    
        Widgets.Pills = Widgets.List.extend({
            className: 'nav nav-pills'
        });
    
        Widgets.Stack = Widgets.List.extend({
            className: 'nav nav-pills nav-stacked'
        });
    
        Widgets.Nav = Widgets.List.extend({
            className: 'nav navbar-nav'
        });
    
        Widgets.Breadcrumb = Widgets.List.extend({
           className: 'breadcrumb',
           onClick:function(view){
               var model = view.model;
               var path = _.chain(model.collection.toJSON())
                  .first(model.index()+1)
                  .pluck('name')
                  .value()
                  .join('/');
               Backbone.history.navigate(path);
           }
        });
    
        Widgets.Navbar = Widgets.List.extend({
            tagName:'div',
            template:Juggler.Templates.navbar,
            childViewContainer:'.navbar-nav',
            className:'navbar navbar-static-top navbar-default',
            options:{
                brand:'Home',
                container:'container'
            },
            ui:{
                brand:'.navbar-brand',
                primary:'.navbar-nav-primary',
                secondary:'.navbar-nav-secondary',
                form:'.navbar-form'
            },
        });
    
        Widgets.Pagination = Widgets.List.extend({
            className:'pagination'
        });
    
        Widgets.MediaList = Widgets.List.extend({
            className:'media-list'
        });
    
    });

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

    Juggler.module('Editors', function(Editors, Juggler, Backbone, Marionette, $, _) {
    
        Editors.Base = Juggler.Views.CompositeView.extend({
            className:'juggler-editor',
            template:_.template(''),
            ui:{
                input:':input'
            },
            setValue:function(){
                this.ui.input.val(this.model.get('value'));
            },
            getValue:function(){
                return this.ui.input.val();
            },
            setSchema:function(){
                var data = this.serializeData();
                var attr = {
                    id:data.cid,
                    placeholder:data.placeholder,
                    name:data.name
                };
                this.ui.input.attr(attr);
            },
            commit:function(){
                this.model.set({value:this.getValue()});
                this.model.validate('value');
            }
        });
        
        Editors.Input = Editors.Base.extend({
            template:_.template('<input type="text" />'),
            events:{
                'change':'onChange',
                'keyup':'onChange'
            },
            modelEvents:{
                'change':'onModelChange'
            },
            onRender:function(){
                this.ui.input.addClass('form-control');
                this.setSchema();
                this.setValue();
            },
            onChange:function(){
                this.commit();
            },
            onModelChange:function(){
                this.setSchema();
                this.setValue();
            }
        });
    
        Editors.Number = Editors.Input.extend({
            template:_.template('<input type="number" />')
        });
    
        Editors.Email = Editors.Input.extend({
            template:_.template('<input type="email" />')
        });
    
        Editors.Url = Editors.Input.extend({
            template:_.template('<input type="url" />')
        });
    
        Editors.Date = Editors.Input.extend({
            template:_.template('<input type="date" />')
        });
    
        Editors.Datetime = Editors.Input.extend({
            template:_.template('<input type="datetime" />')
        });
    
        Editors.Textarea = Editors.Input.extend({
            template:_.template('<textarea />')
        });
    
        Editors.Select = Editors.Input.extend({
            template:_.template('<select />'),
            childViewContainer:'select',
            childView:Juggler.Views.ItemView.extend({
                tagName:'option',
                onRender:function(){
                    var data = this.serializeData();
                    this.$el.prop('value',data.value)
                        .text(data.label);
                }
            }),
            initialize:function(){
                var items = this.serializeData().items;
                this.collection=this.collection||new Juggler.Enities.Collection(items);
            }
        });
    
        Editors.Radio = Editors.Base.extend({
            template:_.template('<div class="radio"></div>'),
            childViewContainer:'.radio',
            childView:Editors.Input.extend({
                tagName:'label',
                template:_.template('<input type="radio" checked="<%- checked %>"><span><%- label %></span>'),
                commit:function(){
                    this.model.set('checked',this.ui.input.prop('checked'));
                },
                onRender:function(){
                    this.setSchema();
                }
            }),
            collectionEvents:{
                'change':'onCollectionChange'
            },
            initialize:function(){
                var items = this.serializeData().items;
                this.collection=this.collection||new Juggler.Enities.Collection(items);
                this.setSchema();
                this.setValue();
            },
            setSchema:function(){
                var model = this.model;
                this.collection.each(function(item,i){
                    item.set('name',model.get('name'));
                })
            },
            setValue:function(){
                var values = this.serializeData().value;
                this.collection.each(function(item,i){
                    var value = item.get('value');
                    item.set('checked',_.contains(values,value));
                });
            },
            getValue:function(){
                var value = this.$('input').val();
                return value;
            },
            onCollectionChange:function(){
                this.commit();
            }
        });
    
        Editors.Checkbox = Editors.Radio.extend({
            template:_.template('<div class="checkbox"></div>'),
            childViewContainer:'.checkbox',
            childView:Editors.Input.extend({
                tagName:'label',
                template:_.template('<input type="checkbox"  /><span><%- label %></span>'),
                commit:function(){
                    var checked = this.ui.input.prop('checked');
                    this.model.set('checked',checked);
                },
                onRender:function(){
                    this.ui.input.prop('checked',this.model.get('checked'));
                }
            }),
            getValue:function(){
                var value = this.collection.filter(function(item){
                    return item.get('checked');
                });
                value = _.map(value,function(item){
                    return item.get('value');
                });
    
                return value;
            }
        });
    
        
    
    });

    Juggler.module('Widgets', function(Widgets, Juggler, Backbone, Marionette, $, _) {
    
        Widgets.Field = Juggler.Views.LayoutView.extend({
            className:'form-group has-feedback',
            template:Juggler.Templates.form_row,
            ui:{
                label:'.control-label',
                field:'.control-field',
                help:'.help-block',
                feedback:'.form-control-feedback'
            },
            modelEvents:{
              'validated':'onValidate' 
            },
            initialize:function(){
                var value = this.options.parentModel.get(this.model.get('name'));
                this.model.set('value',value);
                this.model.set('cid',this.model.cid);
                this._createEditor();
            },
            onRender:function(){
                this.fieldRegion.show(new this.Editor({model:this.model}));
            },
            _createEditor:function(){
                var name = this.model.get('editor')
                .replace(/\w/,function(val){
                    return val.toUpperCase();
                });
                this.Editor = Juggler.Editors[name];
            },
            onValidate:function(model,attributes,errors){
                this.$el.attr('class',this.className+' '+(errors?'has-error':'has-success'));
                this.ui.feedback.removeClass(errors?'glyphicon-ok':'glyphicon-remove')
                    .addClass(errors?'glyphicon-remove':'glyphicon-ok');
                this.ui.help.text(errors&&errors.value.join(',')||'');
            }
        });
        
        Widgets.Form = Juggler.Views.CompositeView.extend({
            tagName:'form',
            childView:Widgets.Field,
            template:Juggler.Templates.form,
            childViewContainer:'.fields',
            options:{
                type:'horizontal',
                submit:''
            },
            ui:{
                submit:'.btn-submit'
            },
            events:{
                'click @ui.submit':'onSubmit'
            },
            modelEvents:{
                'request':'disableSubmit',
                'sync':'enableSubmit',
                'change':'onChange'
            },
            initialize:function(){
                this.setType(this.options.type);
            },
            setType:function(type){
                this.$el.removeClass('form-'+this.options.type).addClass('form-'+type);
                this.options.type = type;
            },
            commit:function(validate){
                var isInvalid = this.collection
                    .some(function(item){
                        return !item.isValid('value');
                    });
    
                var data = this.collection.reduce(function(item1,item2){
                    return item1.set(item2.get('name'),item2.get('value'))
                },new Juggler.Enities.Model);
                
                return !isInvalid&&this.model.set(data);
            },
            submit:function(){
                var that = this;
                this.commit()&&
                this.model.save()
                .success(function(xhr,type,msg){
                    var notice = new Juggler.Widgets.Alert({
                        message:msg,
                        type:'success'
                    });
                    Juggler.notifyRegion.show(notice);
                })
                .fail(function(xhr,type,msg){
                    var notice = new Juggler.Widgets.Alert({
                        message:msg,
                        type:'danger'
                    });
                    Juggler.notifyRegion.show(notice);
                })
                .complete(function(){
                    that.enableSubmit();
                });
            },
            disableSubmit:function(model,xhr){
                this.ui.submit.button('loading');
            },
            enableSubmit:function(){
                this.ui.submit.button('reset');
            },
            onRender:function(){
                if(this.options.submit){
                    this.ui.submit.removeClass('hidden').text(this.options.submit);
                }
                else{
                    this.ui.submit.addClass('hidden');
                }
            },
            onChange:function(model){
                var changed = model.changed;
                this.collection.each(function(item){
                    var name = item.get('name');
                    if(changed[name]){
                        item.set('value',changed[name]);
                    }
                });
            },
            onSubmit:function(e){
                e.preventDefault();
                this.submit();
            }
        });
    
    
    });

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

    Juggler.module('Widgets', function(Widgets, Juggler, Backbone, Marionette, $, _) {
    
        Widgets.Panel = Juggler.Views.LayoutView.extend({
            className:'panel panel-default',
            template:Juggler.Templates.panel,
            ui:{
                header:'.panel-heading',
                body:'.panel-body',
                footer:'.panel-footer'
            },
            options:{
                header:'',
                body:'',
                footer:''
            },
            get:function(key){
                return this.serializeData()[key];
            },
            set:function(key, value){
                this[key+'Region'].close();
                this.model?this.model.set(key,value):(this.options[key]=value,this.ui[key].html(value));
                value?this.ui[key].show():this.ui[key].hide();
            },
            onRender:function(){
                this.get('header')?this.ui.header.show():this.ui.header.hide();
                this.get('footer')?this.ui.footer.show():this.ui.footer.hide();
            }
        });
    
    });

    Juggler.module('Widgets', function(Widgets, Juggler, Backbone, Marionette, $, _) {
    
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
    
    });

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
            className:'navbar',
            template:Juggler.Templates.navbar,
            options:{
                type:'default',
                position:'static',
                container:'container',
                brand:'Juggler'
            },
            ui:{
                brand:'.navbar-brand',
                primary:'.navbar-nav-primary',
                secondary:'.navbar-nav-secondary',
                form:'.navbar-form'
            },
            templateHelpers:function(){
                return this.options;
            },
            onRender:function(){
                var data = this.options;
                this.$el.
                    addClass('navbar-'+data.type).
                    addClass('navbar-'+data.position);
            }
        });
    
    
        Components.Carousel = Juggler.Views.CompositeView.extend({
            className:'juggler-carousel',
            template:Juggler.Templates.carousel,
            childView:Juggler.Views.ItemView.extend({
                className:'item',
                template:_.template('<img src="<%- img %>" />\
                <div class="carousel-caption"><%- caption %></div>')
            }),
            childViewContainer:'.carousel-inner',
            templateHelpers:function(){
                return {
                    id:this.cid
                }
            },
            onRender:function(){
                this.$el.carousel();
            }
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
