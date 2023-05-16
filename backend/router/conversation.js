const express = require("express");
const fatchUser = require("../middileware/fatchuser");
const Conversation = require("../model/conversation");
const router = express.Router();

router.post("/", fatchUser, async (req, res) => {
    const { receivedId } = req.body;
    const userId = req.user.id
    try {
        let conversation = await Conversation.find({$and:[{members:receivedId},{members:userId}]});
        if (conversation.length > 0) return res.status(200).json(conversation[0]);
        let newConversation = await Conversation.create({
            members: [req.user.id, receivedId]
        })
        res.status(201).json(newConversation);
    } catch (error) {
        res.status(500).json(error.message);
    }
})

module.exports = router;