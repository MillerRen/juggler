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