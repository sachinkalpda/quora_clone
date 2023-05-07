

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


    $('.downvote-link').on('click',function(e){
        e.preventDefault();
        let self = this;
        let downvote = $(self).find('span');
        $.ajax({
            type: 'get',
            url : $(self).attr('href'),
        }).done(function(data){
            console.log(data.upvotes);
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


    $('.follow-link').on('click',function(e){
        e.preventDefault();
        let self = this;
        $.ajax({
            type: 'get',
            url : $(self).attr('href'),
        }).done(function(data){
            $(self).html('<i class="fa-solid fa-wifi"></i> '+data.message);
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


    $('.addTopic').on('click',function(){
        let topicElement = $('#topic');
        topicElement.html('<option value="hidden" hidden>Select option</option>')
        $.ajax({
            type: 'get',
            url : '/topic/all',
        }).done(function(data){
            console.log(data);
            // $(self).html('<i class="fa-solid fa-wifi"></i> '+data.message);
            if(data.topics.length == 0){
                topicElement.append('<option value="">No Data Found</option>');
            }
            for(let topic of data.topics){
                topicElement.append('<option value="'+topic._id+'">'+topic.name+'</option>')
            }
            
            // new Noty({
            //     theme: 'relax',
            //     text: data.message,
            //     type: 'success',
            //     layout: 'topRight',
            //     timeout: 1500
            // }).show();
        })
        .fail(function(err){
            console.log("error in completing request");
        });
    }); 


    
}); 