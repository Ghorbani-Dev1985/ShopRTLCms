const mongoose = require('mongoose')
const xAxiosDataSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxLength: 100,
    },
    sale: {
        type: Number,
        require: true,
    }
})

const xAxiosData = mongoose.model('XAxiosData' , xAxiosDataSchema)

module.exports = xAxiosData;