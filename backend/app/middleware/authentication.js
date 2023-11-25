const User = require('../models/User')
const jwt = require('jsonwebtoken')

const authenticateUser = (req, res, next) => {
    
   const token=req?.header('Authorization').split(' ')[1]
   
    let tokenData
    try {
        tokenData = jwt.verify(token, 'sr117')
        console.log('tokenData', tokenData)
        User.findById(tokenData.id)
            .then((user) => {
                console.log('user auth',user)
                req.user=user
                
                next()
            })
            .catch((err) => {
                res.json(err)
            })

    } catch (e) {
        res.status(401).json({
            errors:'not authenticated'
        })
    }
}

const authorizeUser=(req,res,next)=>{
    if(req.permittedRoles.includes(req.user.role)){
        next()
    }else{
        res.status(403).json({
            errors:'user is not authorized to perform this role'
        })
    }
    
    
}


module.exports = { authenticateUser,authorizeUser}