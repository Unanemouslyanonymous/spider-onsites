import {Server} from 'socket.io';

export default (server) => {
  const io = new Server(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('joinUserRoom', (userId) => {
      socket.join(`user_${userId}`);
    });

   
    socket.on('joinGroupRoom', (groupId) => {
      socket.join(`group_${groupId}`);
    });

    
    socket.on('sendGroupMessage', (message) => {
      io.to(`group_${message.groupId}`).emit('receiveMessage', message);
    });


    socket.on('sendUserMessage', (message) => {
      io.to(`user_${message.recipientId}`).emit('receiveMessage', message);
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });
};
