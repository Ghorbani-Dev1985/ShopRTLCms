const express = require('express')
const UserModel = require('../Models/Users')
const userRouter = express.Router()

// ** Get All Users APi
userRouter.get('/all', (req , res) => {
    UserModel.find({}).then(allUsers => {
        res.json(allUsers)
    })
})


// ** Delete Main User APi
userRouter.delete('/delete', (req , res) => {
    let userID = req.headers.authorization
    UserModel.findByIdAndDelete(`${userID}`).then(result => {
        res.send(true)
    })
})

// ** Update Main User APi
userRouter.put('/update', (req , res) => {
    let body = req.body
    let userID = req.headers.authorization
    let userUpdateInfo = {
        firstName : body.firstName,
        lastName: body.lastName,
        userName: body.userName,
        password: body.password,
        phoneNumber: body.phoneNumber,
        city: body.city,
        email: body.email,
        address: body.address,
        score: body.score,
        buy: body.buy,
    }
    UserModel.findByIdAndUpdate(`${userID}` , userUpdateInfo).then(result => {
        res.send(true)
    })
})





module.exports = userRouter;