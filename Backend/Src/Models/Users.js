const mongoose = require('mongoose')

let UserSchema = mongoose.Schema({
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
    title : {
        type: String,
        require: true,
        minLength: 3,
        maxLength: 100,
        trim: true
    },
    phoneNumber : {
        type: Number,
        require: true,
        minLength: 10,
        maxLength: 11,
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
    }
})

let Users = mongoose.model('Users' , UserSchema);

module.exports = Users;