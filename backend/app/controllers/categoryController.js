const Category = require('../models/Categories')
const {validationResult}=require('express-validator')

const categoryCtrl = {}

categoryCtrl.create = async (req, res) => {
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
  
    if(req.user.role==='admin'){
    const body=req.body
    const categoryDetails=new Category(body)
    try{
        await categoryDetails.save()
        res.json(categoryDetails)

    }catch(e){
        res.status(500).json(e)

    }

    }else{
        res.status(403).json({
            errors:"only admin is authorized to create category"
        })
    }
    
}

categoryCtrl.list =async (req, res) => {
    try{
        const category= await Category.find()
        res.json(category)

    }catch(e){
        res.status(500).json(e)

    }
}

categoryCtrl.show = async (req, res) => {
    
    const id=req.params.id
    try{
        const category=await Category.findOne({_id:id,userId:req.user._id})
        res.json(category)

    }catch(e){
        res.status(500).json(e)

    }

}

categoryCtrl.update = async(req, res) => {
    const id = req.params.id
    const body = req.body
    try{
        const category=await Category.findOneAndUpdate({_id:id,userId:req.user._id},body,{new:true})
        res.json(category)

    }catch(e){
        res.status(500).json(e)

    }
}

categoryCtrl.destroy = async (req, res) => {
    const id = req.params.id
    try{
        const category=await Category.findOneAndDelete({_id:id,userId:req.user._id})
        res.json(category)

    }catch(e){
        res.status(500).json(e)

    }

}

module.exports = categoryCtrl