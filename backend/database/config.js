const mongoose = require("mongoose");

mongoose.connect(
    process.env.MONGODB_URL, 
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    },
    
  ).then(()=>console.log("connection successfully"))
  .catch((err)=>{throw err})