const { Model, DataTypes,Table } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('./sequelize');

const PROTECTED_ATTRIBUTES = ['password', 'token']

class User extends Model {
    toJSON () {
        // hide protected fields
        let attributes = Object.assign({}, this.get())
        for (let a of PROTECTED_ATTRIBUTES) {
            delete attributes[a]
        }
        return attributes
    }
}

User.init({
    first_name:{
        type:DataTypes.STRING(255),
    },
    last_name:{
        type:DataTypes.STRING(255),
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
            isEmail: {
                msg: "Enter a valid email address!"
            },
            notNull: {
                msg: 'Email is required.'
            },
        }
    },
    email_verified_at:{
        type:DataTypes.DATE,
    },
    mobile_no:{
        type:DataTypes.NUMBER,
    },
    password:{
        type:DataTypes.STRING
    },
    confirmPassword:{
        type:DataTypes.VIRTUAL,
        set(value){
            if(value === this.password){
                this.password = bcrypt.hashSync(value, 10);
            }else {
                throw Error('Confirm password is required!');
            }
        }
    }
}, {
    sequelize,
    modelName:'User',
    underscored: true
});


module.exports = User;