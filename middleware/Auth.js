const jwt=require("jsonwebtoken");
const Auth=(req,res,next)=>{
    const token=req.headers.authorization;
    if(!token){
        return res.status(401).json({error:'unauthorized'})
    }
    try {
        const payload=jwt.verify(token, "masai");
        req.userId=payload.userId;
        next();
    } catch (error) {
        return res.status(401).json({error:'unauthorized'})
    }
};
module.exports={Auth}