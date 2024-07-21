const express = require('express');
const customerController = require('../controllers/customer')
const authenticate = require("../middleware/auth")
const router = express.Router();

router.get('/',function (req,res){
    res.render('login')
})
router.post('/register',customerController.register)
router.post('/login',customerController.login)
router.get('/user',authenticate,customerController.show)

module.exports = router;