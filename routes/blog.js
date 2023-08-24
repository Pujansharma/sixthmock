const express=require("express");
const {blogModel}=require("../model/blogmodel");
const blogRoutes=express.Router();
const {Auth}=require("../middleware/Auth");

blogRoutes.get("/api/blogs", Auth, async(req,res)=>{
    try {
        const blog=await blogModel.find({})
        .populate('author', 'username')
        .populate('likes', 'username')
        .populate('comments', 'username');
        res.json(blog)
    } catch (error) {
        res.status(500).send(error.message);
    }
})


blogRoutes.post("/api/post/blogs", Auth, async(req,res)=>{
    try {
        const {title,content,category}=req.body;
        const userId=req.userId;
        const blog=new blogModel({
            title,content,category,author:userId
        });
        await blog.save();
        res.status(200).send("Blog added succesfully")
    } catch (error) {
        res.status(500).send(error.message);
    }
})

blogRoutes.delete("/api/blogs/:id", Auth, async(req,res)=>{
    try {
        const blogId=req.params.id;
        const userId=req.userId;
        const blog=await blogModel.findOneAndDelete({
            _id:blogId,
            author:userId,
        });
        if(!blog){
            res.status(404).json("blog not found");
            return;
        }
        res.status(404).json("blog deleted");
    } catch (error) {
        res.status(500).send(error.message);
    }
})


blogRoutes.put("/api/blogs/:id", Auth, async(req,res)=>{
    try {
        const blogId=req.params.id;
        const userId=req.userId;
        const {title,content}=req.body;
        const blog=await blogModel.findOneAndUpdate(
            {_id:blogId, author:userId},
            {title,content},
            {new:true}
        );
        if(!blog){
            res.status(404).json("blog not found");
            return;
        }
        res.json(blog)
    } catch (error) {
        res.status(500).send(error.message);
    }
})

blogRoutes.patch("/api/blogs/:id/like", Auth ,async(req,res)=>{
    try {
        const blogId=req.params.id;
        const userId=req.userId;
        const blog=await blogModel.findById(blogId);
        if(!blog){
            res.status(404).json("blog not found");
            return;
        }
        if(blog.likes.includes(userId)){
            res.status(400).send("allready liked");
            return;
        }
        blog.likes.push(userId);
        await blog.save();
        res.status(200).json("blog like succesfully");
    } catch (error) {
        res.status(500).send(error.message);
    }
})


blogRoutes.patch("/api/blogs/:id/comment", Auth ,async(req,res)=>{
    try {
        const blogId=req.params.id;
    const userId=req.userId;
    const {text}=req.body;
    const blog=await blogModel.findById(blogId);
    if(!blog){
        res.status(404).json("blog not found");
        return;
    }
    const coment={
        text, author: userId
    };
    blog.comments.push(coment);
    await blog.save();
    res.status(200).json("comment post succesfully");
    } catch (error) {
        res.status(500).send(error.message);
    }
})

module.exports={blogRoutes}