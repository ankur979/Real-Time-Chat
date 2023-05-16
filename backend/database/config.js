const mongoose = require("mongoose");

mongoose.connect(
    `mongodb://localhost:27017/test1`, 
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    },
    
  ).then(()=>console.log("connection successfully"))
  .catch((err)=>{throw err})