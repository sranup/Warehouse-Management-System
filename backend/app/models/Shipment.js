const mongoose=require('mongoose')

const {Schema,model}=mongoose

const shipmentSchema=new Schema({
    product:{
        type:Schema.Types.ObjectId,
        ref:'Product'
    },
    docketNo:String,
    customer:{
        name:String,
        address:String,
        phoneNo:String,
        email:String
    }
})

const Shipment=mongoose.model('Shipment',shipmentSchema)

module.exports=Shipment