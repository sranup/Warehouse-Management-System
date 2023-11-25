const initialState=[]

const productReducer=(state=initialState,action)=>{
    switch(action.type){
        case "ADD_PRODUCT":{
            return [...state, { ...action.payload }]
        }

        case "GET_PRODUCTS": {
            return [...action.payload]
        }

        case "EDIT_PRODUCT":{
          return state.map((ele)=>{
                if(ele._id==action.payload.id){
                    return {...ele,...action.payload.body}
                }else{
                    return{...ele}
                }
            })
        }
        case "REMOVE_PRODUCT":{
            return state.filter((ele) => ele._id !== action.payload._id)
        }

        default:{
            return [...state]
        }
    }
}

export default productReducer