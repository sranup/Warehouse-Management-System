const mongoose = require('mongoose')
const mongoose_delete = require('mongoose-delete')
const Schema = mongoose.Schema

const productSchema = new Schema({
    name:String,
    amount:Number,
    description:String,
    prodQuantity:Number,
    categoryId:{
        type:Schema.Types.ObjectId,
        ref:'Category'
    },
    isShipped:{
        type:Boolean,
        default:false
    }
}, { timestamps: true })

productSchema.plugin(mongoose_delete)

const Product = mongoose.model('Product', productSchema)
module.exports = Product