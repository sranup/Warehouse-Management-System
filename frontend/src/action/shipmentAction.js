import axios from "axios"


export const asyncShipmentDetails=()=>{
    return(dispatch)=>{
       axios.get('http://localhost:3100/wms/shipments',{
        headers:{
            'Authorization':localStorage.getItem('token')
        }
       })
       .then((response)=>{
        console.log('shipment details',response.data)
        const shipmentData=response.data
        dispatch(asyncShipments(shipmentData))
        
            
       })
       .catch((err)=>{
        alert(err.message)
       })

    }

}

export const asyncShipments=(data)=>{
    return{
        type:"GET_SHIPMENTS",
        payload:data
    }
}

