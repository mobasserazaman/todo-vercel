const mongoose = require("mongoose");

const connectDB = async () => {        
    try{    
        mongoose.connection.on("connected", () => {
            console.log(`Connected to MongoDB at ${mongoose.connection.host}`)
        })
        const MONGODB_URI = process.env.MONGODB_URI;
        if(MONGODB_URI)  console.log(MONGODB_URI);
        else console.log("NO URI FOUND")
        await mongoose.connect(process.env.MONGODB_URI);
    }catch(error){
        console.log("MongoDB connection failed: ", error);
        process.exit(1);

    }
}

module.exports = connectDB;