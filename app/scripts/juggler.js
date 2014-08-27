(function(root, factory) {

  if (typeof define === 'function' && define.amd) {
    define(['marionette','backbone', 'underscore'], function(Marionette, Backbone, _) {
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
  
  
Juggler.module('Config',function(Config,Juggler,Backbone,Marionette,$,_){
    Config.Message = {

    };
});

Juggler.module('Common',function(Common,Juggler,Backbone,Marionette,$,_){
    Common.Dialog = BootstrapDialog;
    Common.Notify = $.growl;
    Common.ProgressBar = $(document).skylo;
});

Juggler.module('Templates',function(Templates,Juggler,Backbone,Marionette,$,_){

});

Juggler.module('Views',function(Views,Juggler,Backbone,Marionette,$,_){

});

Juggler.module('Enities',function(Enities,Juggler,Backbone,Marionette,$,_){

});



Juggler.addInitializer(function(){
    
    Juggler.Common.Notify(false,{
      type: 'warning',
      placement:{align: 'center'},
      mouse_over:'pause',
      z_index:9999,
      animate: {
    enter: 'animated bounceInDown',
    exit: 'animated bounceOutUp'
    }
    });


    Juggler.Common.Dialog.configDefaultOptions({
      title:'提示：',
      closeByBackdrop: false,
    });

    Common.ProgressBar({
        state: 'success',
        inchSpeed: 200,
        initialBurst: 0,
        flat: false
    });

  });


Juggler.on('start',function(){

    if(Backbone.history)
        Backbone.history.start();

  });


  return Juggler;
}));
