const mongoose=require("mongoose");
const userSchema=mongoose.Schema({
    username:String,
    avatar:String,
    email:String,
    password:String
});
const userdata=mongoose.model("userdata",userSchema);

module.exports={userdata};