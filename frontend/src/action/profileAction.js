import axios from 'axios'

export const asyncGetProfile = () => {
    return (dispatch) => {
        axios.get('http://localhost:3100/user/profile', {
            headers: {
                "Authorization": localStorage.getItem('token')
            }
        })
            .then((response) => {
                const profile = response.data
                dispatch(getProfile(profile))
            })
            .catch((err) => {
                alert(err.message)
            })
    }
}

const getProfile = (data) => {
    return {
        type: "SET_PROFILE",
        payload: data
    }
}

export const asyncUpdateProfile = (id, data) => {
    return (dispatch) => {
        axios.put(`http://localhost:3100/user/profile/${id}`, data, {
            headers: {
                "Authorization": localStorage.getItem('token')
            }
        })
            .then((response) => {
                const profile = response.data
                dispatch(updateProfile(profile))
            })
            .catch((err) => {
                alert(err.message)
            })
    }

}

const updateProfile = (data) => {
    return {
        type: "UPDATE_PROFILE",
        payload: data
    }
}