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
    });
    
    Juggler.module('Common', function(Common, Juggler, Backbone, Marionette, $, _) {
        Common.Dialog = BootstrapDialog;
        Common.Notify = $.growl;
        Common.ProgressBar = $(document).skylo;
    });
    
    Juggler.module('Templates', function(Templates, Juggler, Backbone, Marionette, $, _) {
    
    });
    
    Juggler.module('Views', function(Views, Juggler, Backbone, Marionette, $, _) {
        Views.ItemView = Marionette.ItemView.extend({
            constructor: function() {
                this.options = Marionette.getOption(this, 'defaults');
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
                this.regions = Marionette.getOption(this, 'regions') || {};
                Marionette.LayoutView.prototype.constructor.apply(this, arguments);
            },
            defaults: {
                regions: {}
            },
            className: 'row',
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
    
    Juggler.module('Enities', function(Enities, Juggler, Backbone, Marionette, $, _) {
        
        Enities.Model = Backbone.Model.extend({
            url: '/test',
            silent: false,
            message: Juggler.Message,
            parse: function(res, options) {
                return options.collection ? resp : resp.data;
            }
        });
        
        Enities.Collection = Backbone.Collection.extend({
            
        });
        
    });
    
    
    
    Juggler.addInitializer(function() {
        
        Juggler.Common.Notify(false, {
            type: 'warning',
            placement: {align: 'center'},
            mouse_over: 'pause',
            z_index: 9999,
            animate: {
                enter: 'animated bounceInDown',
                exit: 'animated bounceOutUp'
            }
        });
        
        
        Juggler.Common.Dialog.configDefaultOptions({
            title: '提示：',
            closeByBackdrop: false,
        });
        
        $(document).skylo({
            state: 'success',
            inchSpeed: 200,
            initialBurst: 0,
            flat: false
        });
    
    });
    
    
    Juggler.addInitializer(function() {
        
        Juggler.vent.on('syncStart', function(model, data) {
            if (model.silent)
                return;
            Juggler.Common.ProgressBar('start');
        });
        
        Juggler.vent.on('syncDone', function(model, data) {
            if (model.silent)
                return;
            $(document).skylo('end');
            Juggler.Common.Notify(model.message.SYNC_DONE);
        });
        
        Juggler.vent.on('syncFail', function(model, data) {
            if (model.silent)
                return;
            $(document).skylo('end');
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
            $(document).skylo('set', data);
        });
    
    });
    
    
    Juggler.addInitializer(function() {
        
        Juggler.addRegions({
            headerRegion: '#header',
            mainRegion: '#main',
            footerRegion: '#footer'
        })
    
    });
    
    
    Juggler.on('start', function() {
        
        if (Backbone.history)
            Backbone.history.start();
    
    });
    
    
    return Juggler;
}));
