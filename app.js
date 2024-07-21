require('dotenv').config();
const express = require('express');
const app = express();
const config = require('./config');
const routes = require('./routes/api');
const multer = require('multer');
const PORT = config.port || 3000;

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// Routes setup
app.use('/api', routes);



app.listen(PORT,function (){
    console.log(`Server started on ${PORT}`);
});

module.exports = app;