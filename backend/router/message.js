const express = require("express");
const fatchUser = require("../middileware/fatchuser");
const Messages = require("../model/messages");

const router = express.Router();

router.post("/", fatchUser, async (req, res) => {
    const {conversationId,text} = req.body;
    const userId = req.user.id;
    try{
        let message = await Messages.create({
            conversationId,
            sender:userId,
            text
        })
        res.status(201).json(message);
    }catch(error){
        res.status(500).json(error.message);
    }
})

router.post("/allMessage", fatchUser, async (req, res) => {
    const {conversationId} = req.body;
    try{
        let message = await Messages.find({
            conversationId,
        })
        res.status(201).json(message);
    }catch(error){
        res.status(500).json(error.message);
    }
})

module.exports = router;