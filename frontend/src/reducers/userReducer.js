const initialState = {
    data: {},
    errors: {}
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case "ADD_USER": {
            return { ...state, data: { ...action.payload } }
        }
        case "SET_ERRORS": {
            return { ...state, errors: action.payload }
        }
        default: {
            return { ...state }
        }
    }
}
export default userReducer