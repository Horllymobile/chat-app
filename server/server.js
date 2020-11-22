const path = require('path');
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');


const publicPath = path.join(__dirname, '../public');

const app = express();
app.use(express.static(publicPath));

let server = http.createServer(app);

let io = socketIo(server);


io.on('connection', (socket) => {
    console.log('Connections established for ', socket.id);

    socket.emit('newMessage', {
        from: 'Admin',
        msg: `Welcome to the group chat ${socket.id}`,
        createdAt: new Date().getTime()
    });

    socket.broadcast.emit('newMessage', {
        from: 'Admin',
        msg: `${socket.id} Join the chat group`,
        createdAt: new Date().getTime()
    });

    socket.on('createMessage', (message) => {
        //console.log(`CreateMessage`, message);

        io.emit('newMessage', {
            from: socket.id,
            msg: message.msg,
            createdAt: new Date().getTime()
        })

        // socket.broadcast.emit('newMessage', {
        //     from: socket.id,
        //     msg: message.msg,
        //     createdAt: new Date().getTime()
        // })
    })

    socket.on('disconnect', () => {
        console.log('Client is disconnected', socket.id);
    })
});


const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`App is running on ${PORT}`);
});



