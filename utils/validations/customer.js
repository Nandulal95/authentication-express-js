const {body} = require("express-validator");
const User = require("../../models/user");

const registrationRule = [
    body("first_name").notEmpty(),
    body("last_name").notEmpty(),
    body("mobile_no").notEmpty().custom(async value => {
        const user = await User.findOne({ where: { mobile_no: value } });

        if (user) {
            throw new Error('Mobile number already in use');
        }
    }),
    body("email").isEmail().custom(async value => {
        const user = await User.findOne({ where: { email: value } });
        console.log(user)
        if (user) {
            throw new Error('E-mail already in use');
        }
    }),
    body("password").notEmpty(),
]
module.exports = {registrationRule}