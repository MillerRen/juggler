Juggler.module('Widgets', function(Widgets, Juggler, Backbone, Marionette, $, _) {

    Widgets.Dialog = Juggler.Views.LayoutView.extend({
        className:'modal fade',
        template:Juggler.Templates.dialog,
        options:{
            type:'success',
            title:'',
            content:'',
            buttons:{
                'positive':{},
                'negative':{}
            },
            backdrop:'static'
        },
        ui:{
            header:'.modal-header',
            body:'.modal-body',
            footer:'.modal-footer'
        },
        regions:{
            headerRegion:'.modal-header',
            bodyRegion:'.modal-body',
            footerRegion:'.modal-footer'
        },
        onRender:function(){
            this.ui.header.addClass('alert alert-'+this.options.type);
            if(!this.options.buttons){
                this.ui.footer.remove()
                return;
            }
        },
        onShow:function(){
            this.$el.modal(this.options);
        },
        onClose:function(){
            this.$el.modal('destroy');
        }
    });

    Widgets.Notice = Juggler.Views.ItemView.extend({
        className:'alert alert-dismissable fade in animated juggler-alert',
        template:Juggler.Templates.alert,
        options:{
            type:'warning',
            message:'message'
        },
        events:{
            'close.bs.alert':'onClose'
        },
        initialize:function(options){
            this.$el.addClass('alert-'+this.options.type);
        },
        onShow:function(){
            this.$el.css('margin-left',-this.$el.outerWidth()/2+'px');
            this.$el.addClass('bounceInDown')
        },
        onClose:function(e){
            this.destroy();
        }
    });

    Widgets.Progressbar = Marionette.ItemView.extend({
        className:'progress progress-striped active juggler-progress',
        template:_.template('<div class="progress-bar"></div>'),
        options:{
            type: 'success'
        },
        ui:{
            bar:'.progress-bar'
        },
        modelEvents:{
            'progress':'onProgress'
        },
        progress:function(progress){
            progress = progress<0?0:progress;
            progress = progress>100?100:progress;
            if(progress>=100)
               return this.destroy();
            this.ui.bar.css('width',progress+'%');
        },
        onRender:function(){
            this.ui.bar.addClass('progress-bar-'+this.options.type);
        },
        onProgress:function(progress){
            this.progress(progress);
        }
    });

    Widgets.Panel = Juggler.Views.LayoutView.extend({
        className:'panel panel-default',
        template:Juggler.Templates.panel,
        ui:{
            header:'.panel-heading',
            body:'.panel-body',
            footer:'.panel-footer'
        },
        options:{
            header:'',
            body:'',
            footer:''
        },
        get:function(key){
            return _.extend(this.serializeData(),this.templateHelpers())[key];
        },
        set:function(key, value){
            this.model?this.model.set(key,value):(this.options[key]=value,this.ui[key].html(value));
            value?this.ui[key].show():this.ui[key].hide();
        },
        onRender:function(){console.log(this.serializeData())
            this.get('header')?this.ui.header.show():this.ui.header.hide();
            this.get('footer')?this.ui.footer.show():this.ui.footer.hide();
        }
    });

    Widgets.GroupList = Juggler.Views.ListView.extend({
        className: 'list-group',
        childView: Juggler.Views.ListItemView.extend({
            className: 'list-group-item'
        })
    });

    Widgets.Tabs = Juggler.Views.ListView.extend({
        className: 'nav nav-tabs'
    });

    Widgets.Pills = Juggler.Views.ListView.extend({
        className: 'nav nav-pills'
    });

    Widgets.Stack = Juggler.Views.ListView.extend({
        className: 'nav nav-pills nav-stacked'
    });

    Widgets.Nav = Juggler.Views.ListView.extend({
        className: 'nav navbar-nav'
    });

    Widgets.Breadcrumb = Juggler.Views.ListView.extend({
       className: 'breadcrumb' 
    });

    Widgets.Navbar = Juggler.Views.ListView.extend({
        tagName:'div',
        template:Juggler.Templates.navbar,
        childViewContainer:'.navbar-nav-primary',
        className:'navbar navbar-static-top navbar-default',
        options:{
            brand:'Home'
        },
        serializeData:function(){
            return this.options;
        }
    });

    Widgets.DropdownMenu = Juggler.Views.ListItemView.extend({
       className:'dropdown-menu' 
    });

    Widgets.Pagination = Juggler.Views.ListItemView.extend({
        className:'pagination'
    });

    Widgets.MediaList = Juggler.Views.ListItemView.extend({
        className:'media-list'
    });

    Widgets.Th = Juggler.Views.ItemView.extend({
        tagName:'th',
        template:_.template('<%= label %>')
    });

    Widgets.Td = Juggler.Views.ItemView.extend({
        tagName:'td',
        template:_.template('<%= text %>'),
        serializeData:function(){
            return {text:this.options.tr.model.get(this.model.get('name'))};
        }
    });

    Widgets.Tr = Juggler.Views.CompositeView.extend({
        tagName:'tr',
        childView:Widgets.Td,
        childViewOptions:function(){
            return {tr:this}
        }
    });

    Widgets.Thead = Widgets.Tr.extend({
        childView:Widgets.Th
    });

    Widgets.Tbody = Juggler.Views.CompositeView.extend({
        childView:Widgets.Tr,
        childViewOptions:function(){
            return {collection:this.options.columns}
        }
    });

    Widgets.Table = Juggler.Views.LayoutView.extend({
        tagName:'table',
        className:'table table-hover table-striped',
        childView:Widgets.Tr,
        childViewContainer:'tbody',
        template:_.template('<thead></thead><tbody></tbody><tfoot></tfoot>'),
        regions:{
            theadRegion:'thead',
            tbodyRegion:'tbody',
            tfootRegion:'tfoot'
        },
        initialize:function(){
            this.head = new Widgets.Thead({
                collection:this.options.columns,
                parent:this
            });
            this.body = new Widgets.Tbody({
                collection:this.collection,
                columns:this.options.columns
            });
            this.tbodyRegion.attachHtml = function(view){
                this.$el.html(view.$el.html())
            };
        },
        onRender:function(){
            this.theadRegion.show(this.head);
            this.tbodyRegion.show(this.body);
        }
    });

    Widgets.GridLayout = Juggler.Views.LayoutView.extend({
        className:'grid-layout',
        template:function(data){
            var tdata = data.items||[data],
                tpl =  _.map(tdata,function(region,r){
                var columns = _.map(region,function(item,i){
                    var className,t,region_name;
                    region_name = !_.isNaN(Number(i))?'col-'+i:i;
                    className = _.map(item,function(item2,i2){
                                return _.isObject(item2)?_.map(item2,function(item3,i3){
                                    return 'col-'+i2+'-'+i3+(item3?'-'+item3:'');
                                }).join(' '):'col-'+i2+'-'+item2;
                            }).join(' ');
                    return '<div class="'+className+'" data-region="'+region_name+'"></div>';
                    
                }).join('');
                return '<div class="row">'+columns+'</div>'
            }).join('');
            return tpl;
        }

    });

    Widgets.FormRow = Juggler.Views.ItemView.extend({
        className:'form-group',
        template:Juggler.Templates.form_row
    });
    
    Widgets.Form = Juggler.Views.CompositeView.extend({
        tagName:'form',
        childView:Widgets.FormRow
    });


});