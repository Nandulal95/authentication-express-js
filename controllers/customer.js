const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
async function register(req,res,next){
    try{
        const user = await User.create({
            first_name:"nandulal",
            last_name:"borse",
            email:"test@gmail.com",
            mobile_no:1234567890,
            password:"123432dx"
        });

        res.status(200).json({status:true,message:"You are successfully registered!",data:user.toJSON()});
    }catch (error){
        return next(error);
    }
}
async function login(req,res){
    try{
        const {email,password} = req.body;

        const user = await User.findOne({
            where: {
                email: email,
            },
        });
        // Generate token
        const token =  jwt.sign(
            {id: user.id},
            process.env.JWT_SECRET,
            {expiresIn: "15m"}
        );
        res.status(200).json({status:true,message:"You are successfully logged in!",data:token});
    }catch (error){
        res.status(400).json({status:false,message:error});
    }
}
function show(req,res){
    res.status(200).json({status:true,message:"User Info returned",data:req.user})
}


module.exports = {
    register,
    login,
    show
}