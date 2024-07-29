const io = require('socket.io-client');
const socket = io('http://localhost:3000');
const fs = require('fs');
const path = require('path');

const stream = fs.createReadStream(path.join(__dirname, 'sourceData', 'largeFile.deb'));

socket.on('connect', () => {
  stream.on('data', (chunk) => {
    socket.emit('file', chunk);
  });

  stream.on('end', () => {
    socket.emit('fileEnd', '1');
  })
});