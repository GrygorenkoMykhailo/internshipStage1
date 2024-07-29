const socket = io('http://localhost:3000');

    socket.on('connect', () => {
        console.log('Connected to server');
    });

    socket.on('disconnect', () => {
        console.log('Disconnected from server');
    });

    socket.emit("message", {
        chat_id: 1,
        author: 'pedik',
        content: 'dolboeb',
    });