const express = require('express')
const UserModel = require('./../Models/Users')
const userRouter = express.Router()

// ** Get All Users APi
userRouter.get('/all', (req , res) => {
    UserModel.find({}).then(allUsers => {
        res.json(allUsers)
    })
})

// ** Get Main User Info APi
userRouter.get('/user', (req , res) => {
    let userID = req.headers.authorization

    UserModel.findById(`${userID}`).then(mainUserInfo => {
        res.send(mainUserInfo)
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
        title: body.title,
        userName: body.userName,
        password: body.password,
    }
    UserModel.findByIdAndUpdate(`${userID}` , userUpdateInfo).then(result => {
        res.send(true)
    })
})

// ** Add New User APi
userRouter.post('/newUser', (req , res) => {
    let body = req.body
    let newUserInfo = {
        firstName : body.firstName,
        lastName: body.lastName,
        title: body.title,
        userName: body.userName,
        password: body.password,
    }
    let addNewUser = new UserModel(newUserInfo)
    addNewUser.save().then(result => {
        res.send(true)
    })
})




module.exports = userRouter;