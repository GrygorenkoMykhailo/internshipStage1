const { Server } = require('socket.io');
const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer();
const io = new Server(server);

const outputFilePath = path.join(__dirname, 'receivedData', 'outputfile.deb');

const outputDir = path.dirname(outputFilePath);
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

let receivedChunks = [];

io.on('connection', (socket) => {
  console.log('Client connected');

  socket.on('file', (chunk) => {
    receivedChunks.push(Buffer.from(chunk, 'utf-8'));
  });

  socket.on('fileEnd', () => {
      const fileBuffer = Buffer.concat(receivedChunks);
      fs.writeFile(outputFilePath, fileBuffer, (err) => {
        if (err) {
          console.error('Error writing file:', err);
        } else {
          console.log('File transfer complete');
        }
      });
      receivedChunks = [];
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

server.listen(3000, () => {
  console.log('Server listening on port 3000');
});
