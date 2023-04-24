const mongo = require("mongoose");

const connectDB = async()=>{
    try{
        await mongo.connect(process.env.Mongo_url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log("MongoDB Connected")
    }catch(err){
        console.log(err)
    }
}
module.exports = connectDB;