import axios from 'axios'
import swal from 'sweetalert'


export const asyncRegisterUser = (formData, handleRedirect,handleServerErrors) => {
    return (dispatch) => {
        axios.post('http://localhost:3100/users/register', formData)
            .then((response) => {
                const userData = response.data
                //console.log('user data',userData)
                if (userData.hasOwnProperty('errors')) {
                    dispatch(setErrors(userData.errors))
                } else {
                    dispatch(registerUser(userData))
                    dispatch(setErrors({}))
                    handleRedirect()
                    swal('account registered')
                }
            })
            .catch((err) => {
                swal('sorry', `${err.message}`, "warning")
                handleServerErrors(err.response.data.errors)
            })
           
           
    }
}

export const registerUser = (userData) => {
    return {
        type: "ADD_USER",
        payload: userData
    }
}

export const setErrors = (err) => {
    return {
        type: "SET_ERRORS",
        payload: err
    }
}

export const asyncLoginUser = (formData, handleRedirect,loginServerErrors) => {
    return (dispatch) => {
        axios.post('http://localhost:3100/users/login', formData)
            .then((response) => {
                const userData = response.data
                if (userData.hasOwnProperty('errors')) {
                    dispatch(setErrors(userData.errors))
                } else {
                    localStorage.setItem('token', userData.token)
                    const tokenVerify = userData.token
                    if (tokenVerify === undefined) {
                        swal('invalid email or password')
                    } else {
                        handleRedirect()
                        swal('logged-in successfully')
                    }
                }
            })
            .catch((err) => {
               // alert(err.message)
               if(err.response.data?.errors?.length>0){
                loginServerErrors(err.response.data.errors)
               }else{
                alert(err.response.data.error)
               }
                
            })
    }
}