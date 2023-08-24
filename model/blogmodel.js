const mongoose=require("mongoose");
const blogSchema=mongoose.Schema({
    title:String,
    content :String,
    category :String,
    author:{type:mongoose.Schema.Types.ObjectId, ref:"userdata"},
    likes:[{type:mongoose.Schema.Types.ObjectId, ref:"userdata"}],
    comments:[
        {
            text:String,
            author:{type:mongoose.Schema.Types.ObjectId, ref:"userdata"}
        },
    ],
    createdAt:{type:Date, default:Date.now},
});
const blogModel=mongoose.model("blogdata",blogSchema);

module.exports={blogModel};