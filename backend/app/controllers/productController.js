const Product = require("../models/Product");
const Category = require("../models/Categories");
const Shipment=require('../models/Shipment')

const productCltr = {};

productCltr.create = async (req, res) => {
 
  const body = req.body;
  body.role=req.user.role
  console.log('body prod',body)
  const productDetails = new Product(body);
  console.log('prod det',productDetails)
  try {
    await productDetails.save();
    await Category.find({ userId: req.user._id });
    res.json(productDetails);
  } catch (e) {
    res.status(500).json(e);
  }
};

productCltr.list = async (req, res) => {
  try {
    const product = await Product.find({ deleted: false, isShipped: false });
    res.json(product);
  } catch (e) {
    res.status(500).json(e);
  }
};

productCltr.update = (req, res) => {
    const id = req.params.id
   
    const body = req.body
    
    Product.findOneAndUpdate({ _id: id }, body, { new: true })
        .then((product) => {
            
            res.status(200).json(product)
        })
        .catch((err) => {
            res.status(404).json(err)
        })
}

productCltr.softDelete = async (req, res) => {
  const id = req.params.id;
  try {
    const product = await Product.delete({ _id: id });
    res.json({
      product,
      id,
    });
  } catch (e) {
    res.status(500).json(e);
  }
};

productCltr.showDeleted = async (req, res) => {
  try{
      const product=await Product.find({deleted:true})
      res.json(product)

  }catch(e){
      res.status(500).json(e)
  }
}

productCltr.restoreProducts =  (req, res) => {
  const id = req.params.id
  console.log('id', id)
  Product.findOne({ _id: id, deleted: true })
      .then((product) => {
         
          if (product) {
              product.restore()
                  .then((restored) => {
                      res.json(restored)
                
                  })
                  .catch((err) => {
                      res.json(err)
                  })
          } else {
              res.json('not found')
          }
      })
      .catch((err) => {
          res.json(err)
      })
 
}

productCltr.hardDelete = async(req, res) => {
  const id=req.params.id
  try{
      const product=await Product.findOneAndDelete({_id:id})
      res.json(product)

  }catch(e){
      res.status(500).json(e)

  }
}

productCltr.moveToShipment=async(req,res)=>{
   const id=req.params.id
   try{

    const product=await Product.findByIdAndUpdate(id,{isShipped:true},{new:true})
    const shipment=new Shipment()
    shipment.product=product._id
    await shipment.save()
    res.json(product)

   }catch(e){
    res.status(500).json(e)

   }
}

module.exports = productCltr;
