const initialState=[]

const deletedProductsReducer=(state=initialState,action)=>{
    switch(action.type){

        default:{
            return [...state]
        }
    }
}

export default deletedProductsReducer