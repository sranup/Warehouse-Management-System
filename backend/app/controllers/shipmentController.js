const Shipment=require("../models/Shipment")

const shipmentctrl={}

shipmentctrl.list=async(req,res)=>{
    try{
        const shipment=await Shipment.find().populate('product')
        res.json(shipment)

    }catch(e){
        res.status(500).json(e)

    }
}

shipmentctrl.update=async(req,res)=>{
    const id=req.params.id
    const body=req.body

    try{
        const shipment=await Shipment.findByIdAndUpdate(id,body,{new:true})
        res.json(shipment)

    }catch(e){
        res.status(500).json(e)

    }
}


module.exports=shipmentctrl