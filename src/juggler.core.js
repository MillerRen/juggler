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
    
    Juggler.VERSION = '0.1.1';
    
    Juggler.noConflict = function() {
        root.Juggler = previousJuggler;
        return this;
    };
    
    Backbone.Juggler = Juggler;

    Juggler.AppRouter = Marionette.AppRouter.extend({

    });

    Juggler.Controller = Marionette.Controller.extend({
        
    });
    
    // @include ./juggler.config.js

    // @include ./juggler.templates.js

    // @include ./juggler.enities.js

    // @include ./juggler.views.js

    // @include ./juggler.widgets_notice.js

    // @include ./juggler.widgets_nav.js

    // @include ./juggler.widgets_button.js

    // @include ./juggler.editors.js

    // @include ./juggler.widgets_form.js

    // @include ./juggler.widgets_table.js

    // @include ./juggler.widgets_panel.js

    // @include ./juggler.widgets_layout.js

    // @include ./juggler.components.js

    // @include ./juggler.initializer.js
    
    // @include ./juggler.start.js
    
    
    return Juggler;
}));
