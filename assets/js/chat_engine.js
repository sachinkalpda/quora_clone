class chatEngine{
    constructor(chatBoxId,userEmail,userId){
        this.chatBox = $(`#${chatBoxId}`);
        this.userEmail = userEmail;
        this.socket = io.connect('http://localhost:5000');
        this.userId = userId
        if(this.userEmail){
            this.connectionHandler();
        }
    }

    

    connectionHandler(){
        let self = this;
        this.socket.on('connect',function(){
            // console.log('Connection Established Using Socket....');
        });

        function renderMessages(messages) {
            let chatSection = $('.chat-section');
            if(messages.length == 0){
                chatSection.html('No Messages Yet..');
                return;
            }
            chatSection.html('');
            for(let message of messages){
                if(self.userId == message.sender){
                    chatSection.append(`<div class="msg right"><span>${message.message}</span></div>`);
                }else{
                    chatSection.append(`<div class="msg left"><span>${message.message}</span></div>`);
                }
                
            }
        }
        

        $('.chat-user-item').on('click',function(e){
            e.preventDefault();
            let reciever = $(this).data('id');
    
            $('#reciever').val(reciever);
            let userName = $(this).children('.user-name').text();
            $('#current-user').html(userName);
            console.log(userName);
            $.ajax({
                type: 'POST',
                url : '/chat/get',
                data : {
                    reciever : reciever
                }
            }).done(function(data){
                $('.chat-footer').css('display','flex');
                renderMessages(data.messages);
                self.socket.emit('join_room',{
                    user_email : self.userEmail,
                    chatroom : data.room.name
                });
        
        
                self.socket.on('User_joined',function(data){
                    console.log('A user joined',data);
                })

                // console.log(data);
                $('#room').val(data.room._id);        
            })
            .fail(function(err){
                console.log("error in completing request");
            });
            
        });



        $('#send').on('click',function(e){
            e.preventDefault();
            let chatSection = $('.chat-section');
            let room = $('#room').val();
            let reciever = $('#reciever').val();
            let msg = $('#message').val();
            if(msg == ''){
                return;
            }

            $.ajax({
                type: 'POST',
                url : '/chat/save',
                data : {
                    room : room,
                    message : msg,
                    reciever : reciever
                }
            }).done(function(data){
                
                // console.log(data);
                self.socket.emit('send_message',{
                    message : msg,
                    user_email : self.userEmail,
                    chatroom : data.room.name
                });
                chatSection.append(`<div class="msg right"><span>${msg}</span></div>`);
                $('#message').val('');
                      
            })
            .fail(function(err){
                
                console.log("error in completing request",err);
            });
            
        });

        self.socket.on('recieve_message',function(data){
            // console.log('Message Recieved',data.message);
            if(data.user_email != self.userEmail){
                let chatSection = $('.chat-section');
                chatSection.append(`<div class="msg left"><span>${data.message}</span></div>`);
            }
            
        });
    }
}