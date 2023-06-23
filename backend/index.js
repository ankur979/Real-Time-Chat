const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
require("./database/config")
const cors = require("cors")
const Conversation = require("./router/conversation");
const message = require("./router/message")
const http = require("http")
const User = require("./router/user")
const {Server} = require("socket.io")


app.use(express.static(__dirname+"/build"));


app.use(express.json());
app.use(cors())


app.use("/api/user",User)
app.use("/api/conversation",Conversation)
app.use("/api/message",message)
app.get("/",(req,res)=>{
    res.sendFile(__dirname + "build/index.html")
})

const server = http.createServer(app)

const io = new Server(server,{
    cors:{
        origin:process.env.SOCKET_URL
    }
})

module.exports = io;
require("./socket/socket")

server.listen(process.env.PORT || 5000, () => {
    console.log("server running");
})