Juggler.module('Widgets', function(Widgets, Juggler, Backbone, Marionette, $, _) {

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
            var value = this.options.parentModel.get(this.model.get('name'));
            this.model.set('value',value);
            this.model.set('cid',this.model.cid);
            this._createEditor();
        },
        onRender:function(){
            this.fieldRegion.show(new this.Editor({model:this.model}));
        },
        _createEditor:function(){
            var name = this.model.get('editor')
            .replace(/\w/,function(val){
                return val.toUpperCase();
            });
            this.Editor = Juggler.Editors[name];
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
            'sync':'enableSubmit',
            'change':'onChange'
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
                    return !item.isValid('value');
                });

            var data = this.collection.reduce(function(item1,item2){
                return item1.set(item2.get('name'),item2.get('value'))
            },new Juggler.Enities.Model);
            
            return !isInvalid&&this.model.set(data);
        },
        submit:function(){
            var that = this;
            this.commit()&&
            this.model.save()
            .success(function(xhr,type,msg){
                var notice = new Juggler.Widgets.Alert({
                    message:msg,
                    type:'success'
                });
                Juggler.notifyRegion.show(notice);
            })
            .fail(function(xhr,type,msg){
                var notice = new Juggler.Widgets.Alert({
                    message:msg,
                    type:'danger'
                });
                Juggler.notifyRegion.show(notice);
            })
            .complete(function(){
                that.enableSubmit();
            });
        },
        disableSubmit:function(model,xhr){
            this.ui.submit.button('loading');
        },
        enableSubmit:function(){
            this.ui.submit.button('reset');
        },
        onRender:function(){
            if(this.options.submit){
                this.ui.submit.removeClass('hidden').text(this.options.submit);
            }
            else{
                this.ui.submit.addClass('hidden');
            }
        },
        onChange:function(model){
            var changed = model.changed;
            this.collection.each(function(item){
                var name = item.get('name');
                if(changed[name]){
                    item.set('value',changed[name]);
                }
            });
        },
        onSubmit:function(e){
            e.preventDefault();
            this.submit();
        }
    });


});