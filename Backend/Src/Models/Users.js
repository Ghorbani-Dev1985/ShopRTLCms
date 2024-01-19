const mongoose = require('mongoose')

let UsersSchema = mongoose.Schema({
    firstName : {
        type: String,
        require: true,
        minLength: 3,
        maxLength: 100,
        trim: true
    },
    lastName : {
        type: String,
        require: true,
        minLength: 3,
        maxLength: 100,
        trim: true
    },
    userName : {
        type: String,
        require: true,
        minLength: 8,
        trim: true
    },
    password : {
        type: String,
        require: true,
        minLength: 8,
        trim: true
    },
    phoneNumber : {
        type: Number,
        require: true,
        minLength: 10,
        maxLength: 11,
        trim: true
    },
    city: {
        type: String,
        require: true,
        maxLength: 10,
        trim: true
    },
    email: {
        type: String,
        require: true,
        trim: true, 
    },
    address: {
        type: String,
        require: true,
        trim: true
    },
    score: {
        type: Number,
        trim: true,
    },
    buy: {
        type: Number,
        trim: true,
    }

})

let Users = mongoose.model('Users' , UsersSchema);

module.exports = Users;