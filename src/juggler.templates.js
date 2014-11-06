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
    '<label class="col-md-2 control-label"></label>\
    <div class="col-md-10">\
        <div class="control-field"></div>\
        <span class="glyphicon form-control-feedback hidden"></span>\
        <span class="help-block"></span>\
    </div>\
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
    </div>'
    );

    Templates.panel = _.template(
        '<div class="panel-heading"><%= header %></div>\
        <div class="panel-body"><%= body %></div>\
        <div class="panel-footer"><%= footer %></div>'
    );

});