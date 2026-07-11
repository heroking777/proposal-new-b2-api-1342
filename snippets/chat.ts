import { Server, Socket } from 'socket.io';

interface Message {
  user: string;
  content: string;
}

const io = new Server(3000);

io.on('connection', (socket: Socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on('chat message', (msg: Message) => {
    console.log(`Message from ${msg.user}: ${msg.content}`);
    io.emit('chat message', msg);
  });

  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

console.log('WebSocket server is running on port 3000');