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

    socket.on('disconnect', () => {
        console.log('Client is disconnected', socket.id);
    })
});


const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`App is running on ${PORT}`);
});



