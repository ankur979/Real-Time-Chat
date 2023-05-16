const express = require("express");
const router = express.Router();
const User = require("../model/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fatchUser = require("../middileware/fatchuser");


router.post("/create", async (req, res) => {
    const { name, username, email, mobile, password } = req.body;
    try {
        // Check User exit 
        let userExit = await User.findOne({ "$or": [{ email }, { username }] });
        if (userExit) return res.status(403).json({ error: "User already exit" });

        //create user
        let hashPass = await bcrypt.hash(password, 10)
        let users = await User.create({
            name,
            password: hashPass,
            email,
            username,
            mobile
        })
        const data = {
            user: {
                id: users._id
            }
        }

        let token = jwt.sign({
            exp: Date.now() * 1000 * 60 * 60 * 24 * 30,
            data: data
        }, process.env.SECRET)

        // User send token
        res.status(201).json({ token });

    } catch (error) {
        console.log(error.message)
        res.status(500).json({error:error.message});
    }

})

router.post("/login", async (req, res) => {
    const { username, password } = req.body;
    try {
        let user = await User.findOne({ "$or": [{ email: username }, { username }] });
        if (!user) return res.status(404).json({ error: "User not found" })
        // compare password
        let passCompare = await bcrypt.compare(password, user.password);
        if (!passCompare) return res.status(400).json({ error: "Plases enter vilid email id or username and password" });
        const data = {
            user: {
                id: user._id
            }
        }

        let token = jwt.sign({
            exp: Date.now() * 1000 * 60 * 60 * 24 * 30,
            data: data
        }, process.env.SECRET)

        // User send token
        res.status(200).json({ token });
    } catch (error) {
        console.log(error)
        res.status(500).json(error);
    }
})

router.get("/user", fatchUser, async (req, res) => {
    try {
        let user = await User.findById(req.user.id).select("-password");
       // delete user.password;
        res.status(200).json( user );
    } catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
})

router.get("/allUser",fatchUser, async (req, res) => {
    try {
      //  let user = await User.findById(req.user.id).select("-password");
       // delete user.password;
        let allUser = await User.find().select("-password");
        allUser = allUser.filter((user) => user._id != req.user.id);

        res.status(200).json( allUser );
    } catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
})

module.exports = router