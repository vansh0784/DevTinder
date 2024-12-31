const valid =require("validator");
const validationForSignUp=(req)=>{
    const {firstName,lastName,email,password}=req;
    if(!firstName||!lastName){
        throw new Error("Please Enter your name");
    }
    if(!valid.isEmail(email)){
        throw new Error("Not a valid email address");
    }
    if(!valid.isStrongPassword(password)){
        throw new Error("Please try a strong password");
    }
};
module.exports={
    validationForSignUp,
}