Juggler.module('Editors', function(Editors, Juggler, Backbone, Marionette, $, _) {

    Editors.Input = Juggler.Views.ItemView.extend({
        tagName:'input',
        className:'form-control'
    });

    Editors.Textarea = Juggler.Views.ItemView.extend({
        tagName:'textarea',
        className:'form-control'
    });

});