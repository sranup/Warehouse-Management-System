
const mongoose = require('mongoose') 
const { Schema, model } = mongoose 
const userSchema = new Schema({
    username: String,
    email: String,
    password: String,
    role:{
        type:String,
        default:'user',
        required:true
    }
}, { timestamps: true })

const User = model('User', userSchema)

module.exports = User 