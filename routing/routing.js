const express =  require('express');
const router = express.Router();
var User=require('../models/register');
//var Login=require('../models/user');
var bcrypt = require("bcryptjs");
let jwt_key = process.env.JWT_TOKEN_KEY;
var jwt = require("jsonwebtoken");

const salt=10;




router.post("/createUser",(req,res)=>{
    const {fname , lname, email , contact, password , conpassword }= req.body;
    User.findOne({email : email},(err,register)=>{
            if(register){
                res.send({message:"User already register"})
            }else{
             //console.log("Plain Password " ,password);
             let enPass =  bcrypt.hashSync(password,salt);
            //console.log("Enc Password " ,enPass);
              User.create({fname , lname , email , contact, password:enPass , conpassword },(error, register) =>{
                    if(error){
                        res.send("Cannot create user");
                    }
                    else{
                        res.json(register);
                    }
                });
            }
    })
 })

 router.post("/loginUser",(req,res)=>{
    let responseObj = { data : "", message : "", status : "", error : "" };
    const { email, password } = req.body;
    User.findOne({email},(error, user) => {
        if(error){
            responseObj.message = "Something went wrong";
            responseObj.status = 400;
            responseObj.error = true;
            res.json(responseObj);
         }else 
         if(user){
              if(bcrypt.compareSync(password,user.password)){
                 responseObj.data = user;
                 responseObj.status = 200;
                 responseObj.error = false;
                 responseObj.token = generateToken(email);
                 res.json(responseObj);
             }
             else{
                 responseObj.message = "Invalid Password";
                 responseObj.status = 200;
                 responseObj.error = false;
                 res.json(responseObj);
             } 
         }
        else{
            responseObj.message = "Invalid Username/Password";
            responseObj.status = 200;
            responseObj.error = true;
            res.json(responseObj);
        }
    });
});

const generateToken = (data) => {
    const token = jwt.sign(data,jwt_key);
    return token;
} 

const validateToken = (token) => {
    try{
        const isVerified = jwt.verify(token,jwt_key);
        if(isVerified){
            return 200;
        }
        else{
            return 401;
        }
    }catch(err){
        return 401;
    }

} 

module.exports = router;