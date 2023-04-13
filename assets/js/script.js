
$(document).ready(function(){
    console.log('ready');

    $('.answer').on('click',function(e){
        e.preventDefault();
        let question = $(this).attr('data-id');

        $('#question_id').val(question);
    });



    $('.comments').on('click',function(){
        let commentBox = $(this).closest('.question-card-footer').next();
        commentBox.slideToggle();
    });


    
});