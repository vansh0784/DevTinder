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
const validateProfileData=(req)=>{
    const editableFields=["firstName","lastName","email","Age","Gender","About","imageUrl"];
    const isAllowed=Object.keys(req.body).every(field=>editableFields.includes(field));
    console.log("is allowed"+isAllowed);
    return isAllowed;
}
module.exports={
    validationForSignUp,
    validateProfileData
}