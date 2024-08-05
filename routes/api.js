const express = require('express');
const customerController = require('../controllers/customer')
const authenticate = require("../middleware/auth");
const User = require('../models/user');
const { registrationRule } = require('../utils/validations/customer');
const router = express.Router();

router.get('/',function (req,res){
    res.render('home')
})
router.post('/register',registrationRule, customerController.register);

router.post('/login',customerController.login)
router.get('/user/:id',customerController.myProfile)
router.get('/user',authenticate,customerController.show)

module.exports = router;