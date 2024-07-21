const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require("express-validator");
const Sequelize = require('sequelize')


async function register(req,res,next){
    try{
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(422).json({ status:false,message:'Validation error',errors: errors.mapped() });
        }

        const user = await User.create({
            first_name:req.body.first_name,
            last_name:req.body.last_name,
            email:req.body.email,
            mobile_no:req.body.mobile_no,
            password:req.body.password
        });

        res.status(200).json({status:true,message:"You are successfully registered!",data:user.toJSON()});
    }catch (error){
        //logger
        res.status(200).json({status:true,message:error,data: {}});
        //res.status(200).json({status:true,message:"Something went wrong.Please try again later!",data: {}});
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
 async function edit(req,res,next){
    try{
        const user = await User.findByPk(req.params.id);
        if(!user){
            res.status(404).send({status:false,message:"User not found!",data:{}})
        }
        res.status(200).json({status:true,message:"User Info returned",data:user});
    }catch (error){
        console.log(error);
        return next();
    }
}
async function show(req,res,next){
    try{
        const user = await User.findByPk(req.user.id);
        res.status(200).json({status:true,message:"User Info returned",data:user.toJSON()});
    }catch (error){
        console.log(error);
        return next();
    }
}


module.exports = {
    register,
    login,
    edit,
    show
}