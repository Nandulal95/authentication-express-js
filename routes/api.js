const express = require('express');
const customerController = require('../controllers/customer')
const authenticate = require("../middleware/auth");
const User = require('../models/user');
const { body } = require('express-validator');
const router = express.Router();

router.get('/',function (req,res){
    res.render('home')
})
router.post('/register',[
    body("first_name").notEmpty(),
    body("last_name").notEmpty(),
    body("mobile_no").notEmpty().custom(async value => {
        const user = await User.findOne({ where: { mobile_no: value } });

        if (user) {
            throw new Error('E-mail already in use');
        }
    }),
    body("email").isEmail().custom(async value => {
        const user = await User.findOne({ where: { email: value } });

        if (user) {
            throw new Error('E-mail already in use');
        }
    }),
    body("password").notEmpty(),
], customerController.register);

router.post('/login',customerController.login)
router.get('/user/:id',customerController.edit)
router.get('/user',authenticate,customerController.show)

module.exports = router;