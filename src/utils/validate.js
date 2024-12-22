import validator from "validator";
let signupValidate = function(req){
    let {organizationName,organizationAbout,organizationLogoURL,organizationUrl,firstname, lastname, email, password, about, photo_url} = req;
    if(!firstname || !lastname){
        throw new Error("Invalid user details");
    }
    if(!organizationName || !organizationAbout){
        throw new Error("Please add organization details");
    }
    if(password && !validator.isStrongPassword(password,{minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1})){
        throw new Error("Please enter strong password")
    }
    if(email && !validator.isEmail(email)){
        throw new Error("Invalid Email Id");
    }
    if(organizationUrl && !validator.isURL(organizationUrl)){
        throw new Error("Invalid Organization Url");
    }
    if(organizationLogoURL && !validator.isURL(organizationLogoURL)){
        throw new Error("Invalid Organization Url");
    }
    if(photo_url && !validator.isURL(photo_url)){
        throw new Error("Invalid Organization Url");
    }
    if(about && about.length>500){
        throw new Error("About can only contain 500 characters");
    }
    if(organizationAbout && organizationAbout.length>1000){
        throw new Error("Organization about can only contain 1000 characters");
    }

}
let loginValidate = function(req){
    let {email, password} = req;
    if(!email || !password){
        throw new Error("Please enter email and password");
    }
    if(email && !validator.isEmail(email)){
        throw new Error("Please enter valid email")
    }
}

export {signupValidate, loginValidate}