const express = require('express');
const port = 3001;
const http = require('http');
const socketIo = require('socket.io');


const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static('public'));

// Example text content to serve
const pageContent = {
    amount: 1600,
    description: "Deposit Bonus",
};

io.on('connection', (socket) => {
    console.log('New client connected');

    //Send page content on update
    const sendTextContent = () => {
        socket.emit('pageContentUpdated', { ...pageContent });
    };

    sendTextContent();
    
    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

//End point to get the page content
app.get('/api/page', (req, res) => {
  res.json(pageContent);
});

// Start the server
server.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});