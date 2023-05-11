module.exports.chatSockets = function(socketServer){
        let io = require('socket.io')(socketServer,{
            cors: {
              origin: '*',
            }
        });
        // to making a new connection
        io.sockets.on('connection',function(socket){
            // console.log(socket);
            console.log('New Connection Established',socket.id);

            // on disconnect
            socket.on('disconnect',function(){
                console.log('Connection Disconnected');
            });

            // for joining the user a room
            socket.on('join_room',function(data){
                console.log('Joining Request Recieved',data);

                socket.join(data.chatroom)

                io.in(data.chatroom).emit('User_joined',data);
            });

            // for sending the message to a room
            socket.on('send_message',function(data){
                io.in(data.chatroom).emit('recieve_message',data);
            });
        });     
}