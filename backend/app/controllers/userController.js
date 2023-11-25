const User = require('../models/User')

const UserProfile = require('../models/UserProfile')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {validationResult}=require('express-validator')

const userCtrl = {}

userCtrl.register = async (req, res) => {
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    const body=req.body
    try{
        const userDetails=new User(body)
        const profileDetails = new UserProfile()
        const salt = await bcryptjs.genSalt() 
        const hashedPassword=await bcryptjs.hash(userDetails.password,salt)
        userDetails.password=hashedPassword
       
        profileDetails.userId = userDetails._id
       
        await profileDetails.save()
        await userDetails.save()
        res.json({
            message:'user registered successfully',
            userDetails
        })

    }catch(e){
        res.json(e)

    }
}



userCtrl.login=async (req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
       return res.status(400).json({errors:errors.array()})
    }

    const body=req.body
    try{
        const user=await User.findOne({email:body.email})
        if(!user){
            return res.status(404).json({error:'invalid email or password'})
        }

        const result=await bcryptjs.compare(body.password,user.password)
        if(!result){
            return res.status(404).json({error:'invalid email or password'})
        }
        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email,
            role:user.role
        }
        const token = jwt.sign(tokenData, 'sr117', { expiresIn: '8d' })
        res.json({
            token: `Bearer ${token}`
        })
    }catch(e){
        res.status(500).json({
            error:'invalid email or password'
        })
    }
}

userCtrl.list=async(req,res)=>{
    try{
        const user=await User.find()
        res.status(200).json(user)

    }catch(e){
        res.status(403).json({
            error:'you are not authorized to get the list of users'
        })
    }
}

userCtrl.account = (req, res) => {
    res.json(req.user)
}

module.exports = userCtrl