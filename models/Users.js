const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');
const jwtToken = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please Enter the name'],
    },
    email: {
        type: String,
        required: [true, 'Please enter the email'],
        match: [
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Emauil does not match',
        ],
    },
    username: {
        type: String,
        required: [true, 'Please enter the username'],
    },
    password: {
        type: String,
        required: [true, 'Please enter the password'],
    },
    createAt: {
        type: Date,
        default: Date.now(),
    },
});

// creating hash password
UserSchema.pre('save', async function (next) {
    const salt = await bcryptjs.genSalt(10);
    this.password = await bcryptjs.hash(this.password, salt);
    next();
});

UserSchema.methods.getjwtToken = function () {
    const token = jwtToken.sign({
            id: this._id,
        },
        process.env.SECRET, {
            expiresIn: 7 * 24 * 60 * 60,
        }
    );
    return token;
};
UserSchema.methods.matchPassword = async function (password) {
    console.log(bcryptjs.compare(password, this.password));

    return await bcryptjs.compare(password, this.password);
};

const User = mongoose.model('User', UserSchema, 'User');
module.exports = User;