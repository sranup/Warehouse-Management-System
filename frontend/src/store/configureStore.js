import { createStore, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import userReducer from '../reducers/userReducer'

import categoryReducer from '../reducers/categoryReducer'

import profileReducer from '../reducers/profileReducer'

import { applyMiddleware } from 'redux'
import productReducer from '../reducers/productReducer'
import deletedProductsReducer from '../reducers/deletedProductsReducer'
import shipmentReducer from '../reducers/shipmentReducer'

const configureStore = () => {
    const store = createStore(combineReducers({
        user: userReducer,
        categories: categoryReducer,
        products:productReducer,
        profile: profileReducer,
        deletedProducts:deletedProductsReducer,
        shipments:shipmentReducer
    }), applyMiddleware(thunk)) 
    return store
}

export default configureStore