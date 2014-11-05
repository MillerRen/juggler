Juggler.addInitializer(function(){
    
    Backbone.Validation.callbacks =  {
        valid: function (view, attr, selector) {
            var $el = view.$('[name=' + attr + ']'), 
                $group = $el.closest('.form-group'),
                $feedback = view.$('.form-control-feedback');

            $group.removeClass('has-error');
            $group.find('.help-block').html('').addClass('hidden');
            $feedback.addClass('glyphicon-ok').removeClass('glyphicon-remove');
        },
        invalid: function (view, attr, error, selector) {
            var $el = view.$('[name=' + attr + ']'), 
                $group = $el.closest('.form-group'),
                $feedback = view.$('.form-control-feedback');

            $group.addClass('has-error');
            $group.find('.help-block').html(error).removeClass('hidden');
            $feedback.addClass('glyphicon-remove').removeClass('glyphicon-ok');
        }
    }

});

Juggler.addInitializer(function() {

    Juggler.addRegions({
        headerRegion: '#header',
        navRegion: '#nav',
        mainRegion: '#main',
        footerRegion: '#footer',
        notifyRegion: '#notify',
        dialogRegion: '#dialog'
    })

});