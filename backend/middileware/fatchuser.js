const jwt = require("jsonwebtoken");
const fatchUser = async (req, res, next) => {
    const token = req.header("user-token")
   // console.log(token)
    if (!token) return res.status(428).json({ error: "Please enter valid token id" });
    try {
        const data = jwt.verify(token, process.env.SECRET);
        req.user = data.data.user;
        next()
    } catch (error) {
        res.status(428).json({ error: "Please enter valid token id" });
    }
}

module.exports = fatchUser;
