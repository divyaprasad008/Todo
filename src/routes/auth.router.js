import { Router } from "express";
import { getFormattedDate } from "../utils/dateHelper.js";
import { signupValidate, loginValidate } from "../utils/validate.js";
import ErrorResponse from "../utils/ErrorResponse.js";
import ApiResponse from "../utils/ApiResponse.js";
import bcrypt from "bcrypt";
import pool from "../db/index.js";
import jwt from "jsonwebtoken";


const userRouter = Router();


userRouter.post("/signup",async(req,res)=>{
    try{
        signupValidate(req.body);
        
        let {organizationName,organizationAbout,organizationLogoURL,organizationUrl,firstname, lastname, email, password, about, photo_url} = req.body;
        let hashPassword = await bcrypt.hash(password,10);
        let insValues = [
            organizationName,
            organizationAbout,
            organizationLogoURL,
            organizationUrl,
            1,
            getFormattedDate(),
            getFormattedDate()
        ]
        let result  = await pool.query("Insert into organization (name, about, logo_url, url, is_active, created_at, updated_at) values($1, $2, $3, $4, $5, $6, $7) RETURNING id",insValues)
        console.log(result.rows[0].id);
        if(result.rows.length>0){
            let organizationId = result.rows[0].id;
            let insValuesUser = [
                organizationId,
                firstname,
                lastname,
                email,
                hashPassword,
                about,
                "Super Admin",
                photo_url,
                1,
                getFormattedDate(),
                getFormattedDate()
            ];
            let resultUser  = await pool.query("Insert into users (organization_id, firstname, lastname, email, password, about, role, photo_url, is_active, created_at, updated_at) values($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING id",insValuesUser)
            if(resultUser.rows.length>0){
                res.send(new ApiResponse(200, "Organization and user registered successfully"));
            }
            else{
                throw new Error("User registration failed");
            }


        }
        else{
            throw new Error("Registration of organization failed");
        }
        
    }catch(error){
        console.log(error)
        res.send(new ErrorResponse(500,"Signup Error", {error:error.message},error.stack));
    }
})


userRouter.post("/login",async(req,res)=>{
    try {
        loginValidate(req.body)
        let {email, password} = req.body;
        let qryVal = [email];
        console.log(qryVal)
        let result = await pool.query('SELECT * from users WHERE email = $1',qryVal);
        console.log(result);
        if(result.rows.length>0){
            let dbpassword = result.rows[0].password;
            let userId = result.rows[0].id;
            let isValid  = await bcrypt.compare(password, dbpassword);
            if(isValid){
                let userData = {userId:userId}
                let signedData = await jwt.sign(userData,process.env.TOKEN_SIGN)
                res.cookie('user',signedData);

                res.send(new ApiResponse(200, "Login Successful"));
            }
            else{
                res.send(new ApiResponse(200, "Login failed"));
            }
        }
        else{
            throw new Error("Please enter valid email");
            
        }
    } catch (error) {
        console.log(error)
        res.send(new ErrorResponse(500,"Signup Error", {error:error.message},error.stack));
    }

});

export default userRouter;