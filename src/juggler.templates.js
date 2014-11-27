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
        <% _.each(items,function(item,i){ %>\
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