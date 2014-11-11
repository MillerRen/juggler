Juggler.module('Widgets', function(Widgets, Juggler, Backbone, Marionette, $, _) {

    

    Widgets.Alert = Juggler.Views.ItemView.extend({
        className:'alert alert-dismissable fade in animated juggler-alert',
        template:Juggler.Templates.alert,
        options:{
            type:'warning',
            message:''
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
            this[key+'Region'].close();
            this.model?this.model.set(key,value):(this.options[key]=value,this.ui[key].html(value));
            value?this.ui[key].show():this.ui[key].hide();
        },
        onRender:function(){
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

    Widgets.Panels = Juggler.Views.CompositeView.extend({
        
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

    Widgets.Navbar = Juggler.Views.ListView.extend({
        tagName:'div',
        template:Juggler.Templates.navbar,
        childViewContainer:'.navbar-nav-primary',
        className:'navbar navbar-static-top navbar-default',
        options:{
            brand:'Home'
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

    Widgets.Button = Juggler.Views.ItemView.extend({
        tagName:'button',
        className:function(){
            return 'btn btn-'+this.serializeData().type;
        },
        template:_.template('<i class="<%- icon %>"/> <span><%- name %></span>')
    });

    Widgets.ButtonGroup = Juggler.Views.CompositeView.extend({
        className:'btn-group',
        childView:Widgets.Button,
        initialize:function(){
            this.collection = new Juggler.Enities.ButtonGroup(this.model.values());
        }
    });

    Widgets.Toolbar = Juggler.Views.CompositeView.extend({
        className:'btn-toolbar',
        childView:Widgets.ButtonGroup
    });

    Widgets.Dialog = Juggler.Views.LayoutView.extend({
        className:'modal fade',
        template:Juggler.Templates.dialog,
        options:{
            type:'success',
            size:'md',
            title:'',
            body:'',
            buttons:{
                'positive':{},
                'negative':{}
            },
            backdrop:'static'
        },
        ui:{
            header:'.modal-title',
            body:'.modal-body',
            footer:'.modal-footer'
        },
        get:function(key){
            return _.extend(this.serializeData(),this.templateHelpers())[key];
        },
        set:function(key, value){
            this[key+'Region'].close();
            this.model?this.model.set(key,value):(this.options[key]=value,this.ui[key].html(value));
            value?this.ui[key].show():this.ui[key].hide();
        },
        onRender:function(){
            this.get('header')?this.ui.header.show():this.ui.header.hide();
            this.get('footer')?this.ui.footer.show():this.ui.footer.hide();
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

    Widgets.Th = Juggler.Views.ItemView.extend({
        tagName:'th',
        template:_.template('<%- value %>')
    });

    Widgets.Td = Juggler.Views.ItemView.extend({
        tagName:'td',
        template:_.template('<%= value %>'),
        events:{
            'click':'onClick'
        },
        serializeData:function(){
            var model = this.model.clone();
            model.set('value',this.options.parentModel.get(this.model.get('name')));
            return model.toJSON();
        },
        onClick:function(){
            if(this.editor)return;
            var Editor = Juggler.module('Editors.Input');
            this.editor = new Editor({
                model:new Juggler.Enities.Field(this.serializeData())
            });
            this.$el.html(this.editor.render().el)
        }
    });

    Widgets.Tr = Juggler.Views.CompositeView.extend({
        tagName:'tr',
        childView:Widgets.Td
    });

    Widgets.Thead = Juggler.Views.CompositeView.extend({
        tagName:'tr',
        childView:Widgets.Th
    });

    Widgets.Tbody = Juggler.Views.CompositeView.extend({
        tagName:'tbody',
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
        regions:{
            theadRegion:'thead',
            tbodyRegion:'tbody',
            tfootRegion:'tfoot'
        },
        template:_.template('<thead></thead><tbody></tbody><tfoot></tfoot>'),
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
                this.$el.replaceWith(view.$el)
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

    Widgets.Field = Juggler.Views.LayoutView.extend({
        className:'form-group has-feedback',
        template:Juggler.Templates.form_row,
        ui:{
            label:'.control-label',
            field:'.control-field',
            help:'.help-block',
            feedback:'.form-control-feedback'
        },
        modelEvents:{
          'validated':'onValidate'  
        },
        initialize:function(){
            this.model.set('value',this.options.parentModel.get(this.model.get('name')));
            this.model.set('cid',this.model.cid);
        },
        onRender:function(){
            this._createEditor();
        },
        _createEditor:function(){
            var name = this.model.get('editor')
            .replace(/\w/,function(val){
                return val.toUpperCase();
            });
            var View = Juggler.Editors[name];
            View&&this.fieldRegion.show(new View({model:this.model}));
        },
        onValidate:function(model,attributes,errors){
            this.$el.attr('class',this.className+' '+(errors?'has-error':'has-success'));
            this.ui.feedback.removeClass(errors?'glyphicon-ok':'glyphicon-remove')
                .addClass(errors?'glyphicon-remove':'glyphicon-ok');
            this.ui.help.text(errors&&errors.value.join(',')||'');
        }
    });
    
    Widgets.Form = Juggler.Views.CompositeView.extend({
        tagName:'form',
        childView:Widgets.Field,
        template:Juggler.Templates.form,
        childViewContainer:'.fields',
        options:{
            type:'horizontal',
            submit:''
        },
        ui:{
            submit:'.btn-submit'
        },
        events:{
            'click @ui.submit':'onSubmit'
        },
        modelEvents:{
            'request':'disableSubmit',
            'sync':'enableSubmit'
        },
        initialize:function(){
            this.setType(this.options.type);
        },
        setType:function(type){
            this.$el.removeClass('form-'+this.options.type).addClass('form-'+type);
            this.options.type = type;
        },
        commit:function(validate){
            var isInvalid = this.collection
                .some(function(item){
                    return !item.isValid();
                });

            var data = this.collection.reduce(function(item1,item2){
                return item1.set(item2.get('name'),item2.get('value'))
            },new Juggler.Enities.Model);

            return !isInvalid&&this.model.set(data);
        },
        submit:function(){
            this.commit()&&this.model.save();
        },
        disableSubmit:function(model,xhr){
            this.ui.submit.attr('disabled',true);
        },
        enableSubmit:function(){
            this.ui.submit.removeAttr('disabled');
        },
        onRender:function(){
            if(this.options.submit){
                this.ui.submit.removeClass('hidden').text(this.options.submit);
            }
            else{
                this.ui.submit.addClass('hidden');
            }
        },
        onSubmit:function(e){
            e.preventDefault();
            this.submit();
        }
    });


});