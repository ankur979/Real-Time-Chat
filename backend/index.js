const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
require("./database/config")
const cors = require("cors")
const Conversation = require("./router/conversation");
const message = require("./router/message")

const User = require("./router/user")
app.use(express.static(__dirname+"/public"));

app.use(express.json());
app.use(cors())


app.use("/api/user",User)
app.use("/api/conversation",Conversation)
app.use("/api/message",message)

app.listen(5000, () => {
    console.log("server running");
})