//require('dotenv').config({path:`${process.cwd()}/.env`});
const express = require('express');
const app = express();
const config = require('./config');
const routes = require('./routes/api');
const multer = require('multer');
const url = require('url');
const PORT = config.port || 8080 ;

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.set('view engine', 'ejs');
// Routes setup
app.use('/api', routes);

// app.use("*",function (req,res,next){
//     res.status(404).json({status:false,message:'Not Found'});
// })

// for error handling purpose
app.use(function(err,req,res,next){
    res.status(401).json({status:false,message:err.message});
})
app.listen(PORT,function (){
    console.log(`Server started on ${PORT}`);
});

module.exports = app;