Juggler.addInitializer(function(){
    
    Backbone.Stickit.addHandler({
        selector: '*',
        setOptions: {validate:true}
    });

    Backbone.Validation.configure({
      forceUpdate: true
    });   

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