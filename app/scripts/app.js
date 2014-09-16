Juggler.addInitializer(function(){
    //Juggler.Common.dialog.success('Hello World!');
    //var pr = new Juggler.Common.Notice({message:'warning'});
    //Juggler.notifyRegion.show(pr);
    var dialog = new Juggler.Common.Dialog({
        title:'hi',
        content:'hello'
    });
    Juggler.dialogRegion.show(dialog);
});