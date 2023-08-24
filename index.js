const express=require("express");
const {connection}=require("./conected/config");
const {userRoutes}=require("./routes/user");
const {blogRoutes}=require("./routes/blog");
require("dotenv").config();
const port=process.env.port || 4500;
const app=express();
const cors=require("cors");
app.use(express.json());
app.use(cors())
app.use(userRoutes)
app.use(blogRoutes)
app.listen(port,async()=>{
    try {
        await connection;
        console.log({"mssg":"connected to DB"})
    } catch (error) {
        console.log(error.message)
    }
    console.log(`server is running on port ${port}`);
})
