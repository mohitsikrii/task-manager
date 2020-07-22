const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const User = require('../../src/models/user')


const userOneId = new mongoose.Types.ObjectId()
const userOne = {
    _id: userOneId,
    name: 'mohit',
    email: 'sikrimohi454@gmail.com',
    password: 'mypassword',
    tokens: [{
        token: jwt.sign({ _id: userOneId }, process.env.JWT_TOKEN)
    }]
}
const setupDatabase=async()=>{
    await User.deleteMany()
    await User(userOne).save()
}
module.exports={
    userOneId,
    userOne,
    setupDatabase
}