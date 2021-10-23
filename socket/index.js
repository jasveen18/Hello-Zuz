const { Server } = require("socket.io");

const PORT = 5000;

const io = new Server(PORT, {
    cors: {
        origin: 'http://localhost:3000'
    }

});

let users = [];

const addUser = (userId, socketId) => {
    !users.some(user => user.userId === userId) && users.push({userId, socketId})
};

const removeUser = (socketId) => {
    users = users.filter(user => user.socketId !== socketId);
};

const getUser = (userId) => {
    //console.log(users);
    //console.log(users.socketId);
    return users.find((user) => user.userId === userId);
};


io.on('connection', (socket) => {
    console.log('User Connected');
    
    //connect
    socket.on('addUser', userId => {
        addUser(userId, socket.id);
        //console.log(users);
        io.emit('getUsers', users);
    })

    //send message
    socket.on('sendMessage', ({senderId, receiverId, text}) => {
        //console.log(senderId);
        const user = getUser(senderId);
        //console.log("userSocket Id",user.socketId)
        //console.log(user.socketId);
        io.to(user.socketId).emit('getMessage', {
            senderId, text
        })
    })

    //disconnect
    socket.on('disconnect', () => {
        console.log('user disconnected');
        removeUser(socket.id);
        io.emit('getUsers', users);
    })

});