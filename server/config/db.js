const mongoose = require('mongoose');

const connectDb = () => {
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>
    {
        console.log("Database successfully connected ",process.env.MONGO_URI)
    })
    .catch((error)=>{
        console.log(error);
    })
    
}

module.exports=connectDb;