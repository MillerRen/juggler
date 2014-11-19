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
          Backbone.history.navigate(view.model.get('name')); 
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