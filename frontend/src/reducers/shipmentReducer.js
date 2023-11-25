 const initialState=[]

const shipmentReducer=(state=initialState,action)=>{
    switch(action.type){
        case "GET_SHIPMENTS": {
            return [...action.payload]
        }

        default:{
            return[...state]
        }
    }
}

export default shipmentReducer