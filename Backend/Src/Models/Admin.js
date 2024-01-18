const mongoose = require('mongoose')
const adminSchema = mongoose.Schema({
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
    task: {
        type: String,
        maxLength: 100
    },
})

const Admin = mongoose.model('admins' , adminSchema)

module.exports = Admin;