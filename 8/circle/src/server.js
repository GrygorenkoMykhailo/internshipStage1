const http = require('http').createServer();

const io = require('socket.io')(http, {
    cors: { origin: '*' }
});

io.on('connection', socket => {
    socket.on('move', data => {
        io.emit('move', data);
    });
});

http.listen(3000, () => {
    console.log('Server is listening on port 3000');
});