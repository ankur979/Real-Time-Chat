const io = require("../index");

let users = [];

const addUser = (userId, socketId) => {
    !users.some((user) => user.userId === userId) && users.push({ userId, socketId })
};

const removeUser = (socketId) => {
    users = users.filter((user) => user.socketId !== socketId);
}

const getUser = (userId) => users.find((user) => user.userId === userId);

io.on("connection", (socket) => {
    //user connect
    console.log("user connect on socket io" + socket.id)
    //take userId and socketId from user
    socket.on("addUser", (userId) => {
        addUser(userId, socket.id)
        io.emit("getUser", users)
    })

    // send and get message
    socket.on("sendMessage", ({ senderId, receiverId, text }) => {
        const user = getUser(receiverId);
        if(user){
            io.to(user.socketId).emit("getMessage", {
                senderId,
                text
            })
        }
    })

    //when disconnect
    socket.on("disconnect", () => {
        console.log("a user disconnected!");
        removeUser(socket.id);
        io.emit("getUsers", users);
    });
});

