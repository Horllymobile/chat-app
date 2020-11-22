let socket = io();

socket.on('connect', function(){
    console.log('Connected to');

    socket.emit('createMessage', {
        from: "Horllymobile",
        msg: "What up"
    });

    socket.on('newMessage', function(msg){
        console.log('newMessage', msg);
    })
});

socket.on('disconnect', function(){
    console.log('Client is disconnected');
});
