const mongoose = require('mongoose')

let TransactionSchema = mongoose.Schema({
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
    createdAt : {
        type: String,
        require: true,
        maxLength: 100,
        trim: true
    },
    price : {
        type: Number,
        require: true,
        maxLength: 100,
        trim: true
    },
    status : {
        type: String,
        require: true,
        maxLength: 50,
        trim: true
    },
})

let Transaction = mongoose.model('Transaction' , TransactionSchema);

module.exports = Transaction;