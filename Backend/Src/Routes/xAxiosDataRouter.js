const express = require('express')
const xAxiosDataModel = require('../Models/xAxiosData')
const xAxiosDataRouter = express.Router()

// ** Get All xAxiosDatas APi
xAxiosDataRouter.get('/all', (req , res) => {
    xAxiosDataModel.find({}).then(allXAxiosDatas => {
        console.log(allXAxiosDatas)
        res.json(allXAxiosDatas)
    })
})

// ** Get Main xAxiosData Info APi
xAxiosDataRouter.get('/xAxiosData', (req , res) => {
    let xAxiosDataID = req.headers.authorization

    xAxiosDataModel.findById(`${xAxiosDataID}`).then(mainXAxiosDataInfo => {
        res.send(mainXAxiosDataInfo)
    })
})

// ** Delete Main xAxiosData APi
xAxiosDataRouter.delete('/delete', (req , res) => {
    let xAxiosDataID = req.headers.authorization

    xAxiosDataModel.findByIdAndDelete(`${xAxiosDataID}`).then(result => {
        res.send(true)
    })
})

// ** Update Main xAxiosData APi
xAxiosDataRouter.put('/update', (req , res) => {
    let body = req.body
    let xAxiosDataID = req.headers.authorization
    let xAxiosDataInfo = {
        name : body.name,
        sale: body.sale,
    }
    xAxiosDataModel.findByIdAndUpdate(`${xAxiosDataID}` , xAxiosDataInfo).then(result => {
        res.send(true)
    })
})

// ** Add New xAxiosData APi
xAxiosDataRouter.post('/newXAxiosData', (req , res) => {
    let body = req.body
    let newXAxiosDataInfo = {
        name : body.name,
        sale: body.sale,
    }
    let addNewXAxiosData = new xAxiosDataModel(newXAxiosDataInfo)
    addNewXAxiosData.save().then(result => {
        res.send(true)
    })
})




module.exports = xAxiosDataRouter;