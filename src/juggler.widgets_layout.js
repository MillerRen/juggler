Juggler.module('Widgets', function(Widgets, Juggler, Backbone, Marionette, $, _) {

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

});