import axios from "axios";

export const asyncAddProduct=(data)=>{
    return(dispatch)=>{
         axios.post('http://localhost:3100/wms/product',data,{
            headers:{
                "Authorization":localStorage.getItem('token')
            }
         })
         .then((response)=>{
            console.log('prod response',response.data)
            const productData=response.data
            if(productData.hasOwnProperty('errors')){
                alert(productData.message)
            }else{
               dispatch(addProduct(productData))
            }

         })
         .catch((err)=>{
            alert(err.response.data.errors)
         })
    }
}

export const addProduct=(data)=>{
    return{
        type:"ADD_PRODUCT",
        payload:data
    }
}

export const asyncGetProduct=()=>{
    return(dispatch)=>{
        axios.get('http://localhost:3100/wms/product',{
            headers:{
                'Authorization':localStorage.getItem('token')
            }
        })
        .then((response)=>{
            console.log('fetch all products',response.data)
            const productsData=response.data
            const filteredData=productsData.filter((ele)=>!ele.deleted)
            if(productsData.hasOwnProperty('errors')){
                alert(productsData.message)
            }else{
                dispatch(asyncProducts(filteredData))
            }
        })
        .catch((err)=>{
            alert(err.message)
        })
    }
}

export const asyncProducts=(data)=>{
    return{
        type:"GET_PRODUCTS",
        payload:data
    }
}

export const asyncEditProduct=(id,data)=>{
    return(dispatch)=>{
        axios.put(`http://localhost:3100/wms/product/${id}`,data,{
            headers:{
                'Authorization':localStorage.getItem('token')
            }
        })
        .then((response)=>{
            //console.log('edit response',response.data)
            const productData=response.data
            if(productData.hasOwnProperty('errors')){
                alert(productData.message)
            }else{
                dispatch(editProduct(productData))
            }

        })
        .catch((err)=>{
            alert(err.message)
        })
    }

}

export const asyncRemoveProduct=(id)=>{
    return(dispatch)=>{
        axios.delete(`http://localhost:3100/wms/product/${id}`,{
            headers:{
                'Authorization':localStorage.getItem('token')
            }
        })
        .then((response)=>{
            console.log('deleted product',response.data)
            const productData=response.data
            if(productData.hasOwnProperty('errors')){
                alert(productData.message)
            }else{
                dispatch(removeProduct(productData))
            }
        })
        .catch((err)=>{
            alert(err.message)
        })
    }
}

export const removeProduct=(productData)=>{
    return{
        type:"REMOVE_PRODUCT",
        payload:productData
    }
}

export const editProduct=(data)=>{
    return{
        type:"EDIT_PRODUCT",
        payload:{
            id:data._id,
            body:data
        }
    }

}

export const asyncProductToShipment=(id)=>{
    return(dispatch)=>{
        axios.put(`http://localhost:3100/wms/moveToShipment/${id}`,{},{
            headers:{
              'Authorization':localStorage.getItem('token')
            }
          })
          .then((response)=>{
            //console.log('response',response.data)
            const shipmentProduct=response.data
            if(shipmentProduct.hasOwnProperty('errors')){
                alert(shipmentProduct.message)
            }else{
                dispatch(removeProduct(shipmentProduct))
            }
      
          })
          .catch((err)=>{
            alert(err.message)
          })
    }
}