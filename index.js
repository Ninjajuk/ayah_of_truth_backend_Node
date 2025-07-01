const express = require('express')
const http = require('http');
const cors = require('cors')
const { Server } = require('socket.io');

const app = express()
const port = 3000

app.use(cors())
app.use(express.json())

// Create HTTP server
const server = http.createServer(app);

// Initialize Socket.IO
const io = new Server(server, {
  cors: {
    origin: '*', // Allow all origins, for dev. Secure this in production
    methods: ['GET', 'POST']
  }
});

app.get('/', async(req,res)=>{
res.send({message:"Ajuk Loves Samsu !"})
})

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log(`⚡ New client connected: ${socket.id}`);

  // Listen for events from client
  socket.on('send_message', (data) => {
    console.log('Received:', data);

    // Broadcast message to all clients
    io.emit('receive_message', data);
  });

  socket.on('disconnect', () => {
    console.log(`❌ Client disconnected: ${socket.id}`);
  });
});

server.listen( port, ()=>{
    console.log(`Server is running at ${port}`)
})