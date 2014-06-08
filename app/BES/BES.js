if (Meteor.isClient) {
  Template.normal.events({
    'click input#upload': function(){

        var message = $('pre#message');
        var content = $('pre#json_content');

        var file = $('input#json')[0].files[0];

        message.text('');
        content.text('');

        if(file){
            var reader = new FileReader();
            
            reader.onload = function(e){
                try{
                    var json_text = e.target.result;
                    var json = $.parseJSON(json_text);
                    message.text('Upload success');
                    content.text( JSON.stringify(json, null, '    ') );
                    console.log(json);
                }catch(ex){
                    message.text('Error: potentially invalid JSON \n(Please check if it is malformed JSON, eg. key is not included by double quotation mark, like {test: 1} or {\'test\': 1})');
                    console.error(ex);
                }
            };

            reader.onerror = function(e){
                message.text('Error: upload error');
                console.error(e);
            };

            reader.readAsText(file, "UTF8");

        }else{
            message.text('Error: no file selected');
        }
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
