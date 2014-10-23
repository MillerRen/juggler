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

    });