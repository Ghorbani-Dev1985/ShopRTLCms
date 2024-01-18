const express = require('express')
const TransactionModel = require('../Models/Transaction')
const transactionRouter = express.Router()

// ** Get All Transactions APi
transactionRouter.get('/all', (req , res) => {
    TransactionModel.find({}).then(allTransactions => {
        console.log(allTransactions)
        res.json(allTransactions)
    })
})

// ** Get Main Transaction Info APi
transactionRouter.get('/transaction', (req , res) => {
    let transactionID = req.headers.authorization

    TransactionModel.findById(`${transactionID}`).then(mainUserInfo => {
        res.send(mainUserInfo)
    })
})

// ** Delete Main Transaction APi
transactionRouter.delete('/delete', (req , res) => {
    let transactionID = req.headers.authorization

    TransactionModel.findByIdAndDelete(`${transactionID}`).then(result => {
        res.send(true)
    })
})

// ** Update Main Transaction APi
transactionRouter.put('/update', (req , res) => {
    let body = req.body
    let transactionID = req.headers.authorization
    let transactionUpdateInfo = {
        firstName : body.firstName,
        lastName: body.lastName,
        price: body.price,
        status: body.status,
    }
    TransactionModel.findByIdAndUpdate(`${transactionID}` , transactionUpdateInfo).then(result => {
        res.send(true)
    })
})

// ** Add New Transaction APi
transactionRouter.post('/newTransaction', (req , res) => {
    let body = req.body
    let date = new Date().toLocaleDateString("fa-IR")
    let newTransactionInfo = {
        firstName : body.firstName,
        lastName: body.lastName,
        createdAt : date,
        price: body.price,
        status: body.status,
    }
    let addTransaction = new TransactionModel(newTransactionInfo)
    addTransaction.save().then(result => {
        res.send(true)
    })
})




module.exports = transactionRouter;