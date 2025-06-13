const valid = require("validator");

const validationForSignUp = (req) => {
    const { firstName, lastName, email, password, About, Age, Gender } = req;
    const validGenders = ["male", "female"];

    // Validate name
    if (!firstName || !lastName) {
        throw new Error("First name and last name are required.");
    }

    // Validate email
    if (!email || !valid.isEmail(email)) {
        throw new Error("Please provide a valid email address.");
    }

    // Validate password
    if (!password || !valid.isStrongPassword(password)) {
        throw new Error("Password is not strong enough. Please use a stronger password.");
    }

    // Validate About field (if provided)
    if (About && About.length > 50) {
        throw new Error("The 'About' field must be 50 characters or less.");
    }

    // Validate Age (if provided)
    if (Age) {
        const ageValue = Number(Age); // Convert to number
        if (isNaN(ageValue) || ageValue <= 0 || ageValue > 120) {
            throw new Error("Please provide a valid age between 1 and 120.");
        }
    }

    // Validate Gender (if provided)
    if (Gender) {
        const genderLowerCase = Gender.toLowerCase(); // Normalize input
        if (!validGenders.includes(genderLowerCase)) {
            throw new Error("Please provide a valid gender ('male' or 'female').");
        }
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