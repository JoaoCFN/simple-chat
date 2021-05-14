const express = require('express');
const { createServer } = require('http');
const htpp = require('http');
const socketIO = require('socket.io');

const app = express();
const server = htpp.createServer(app);
const io = socketIO(server);

app.use(express.static(__dirname + '/public'));

server.listen(3333, () => {
    console.log('running')
});

let messagesHistory = [];

io.on('connection', (socket) => {
    console.log('new conection');

    messagesHistory.forEach((messageBody) => {
        socket.emit('show-message', messageBody);
    });

    socket.on('share-message', (messageBody) => {
        io.emit('show-message', messageBody);

        messagesHistory.push(messageBody);
    })
});

