Juggler.module('Helpers', function(Helpers, Juggler, Backbone, Marionette, $, _) {

    Helpers.startModule = function(appName, args) {
        var currentApp = Juggler.module(appName);
		
        if (Juggler.currentApp) {
            Juggler.currentApp.stop();
        }
        
        Juggler.currentApp = currentApp;
        currentApp.start(args);
    };

    

    Helpers.Validator = Marionette.Object.extend({
        
    });

});