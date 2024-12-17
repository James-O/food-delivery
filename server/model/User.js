const mongoose = require('mongoose');
//const bcrypt = require('bcrypt');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: [validator.isEmail, 'Invalid email address']
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        select: false,
    },
    passwordConfirm: {
        type: String,
        required: true,
        minlength: 6,
        select: false,
        validate: {
            validator: function (value) {
                //return this.password === value;
                return value === this.password;
            },
            message: 'Passwords do not match'
        }
    },
    isVerified: {
        type: Boolean,
        default: false,
        //select: false,
    },
    otp: {
        type: Number,
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    profileImage: {
        type: String,
        required: true,
    }
},
    {
        timestamps: true,
    }
);


module.exports = mongoose.model('User',userSchema);