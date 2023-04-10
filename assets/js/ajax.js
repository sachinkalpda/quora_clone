

$(document).ready(function(){
    $('.upvote-link').on('click',function(e){
        e.preventDefault();
        let self = this;
        let upvote = $(self).find('span');
        $.ajax({
            type: 'get',
            url : $(self).attr('href'),
        }).done(function(data){
            upvote.html(data.upvotes);
            new Noty({
                theme: 'relax',
                text: data.message,
                type: 'success',
                layout: 'topRight',
                timeout: 1500
            }).show();
        })
        .fail(function(err){
            console.log("error in completing request");
        });
        
    });


    
}); 