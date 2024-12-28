const userAuth=(req,res,next)=>{
    console.log("Check for user authorization");
    const token="xyz";
    const isUserAuth=token==="xyz";
    if(!isUserAuth){
        res.status(401).send("Unauthorized Request");
    }
    else next();
}
const adminAuth=(req,res,next)=>{
    console.log("Check for admin authorization");
    const token="abc";
    const isAdminAuth=token==="def";
    if(!isAdminAuth){
        res.status(401).send("Unautorized Request");
    }
    else next();
}
module.exports={
    userAuth,
    adminAuth
};