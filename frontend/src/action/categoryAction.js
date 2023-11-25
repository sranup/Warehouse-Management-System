import axios from 'axios'

export const asyncAddCategory = (data) => {
    return (dispatch) => {
        axios.post('http://localhost:3100/user/category', data, {
            headers: {
                "Authorization": localStorage.getItem('token')
            }
        })
            .then((response) => {
                const categoryData = response.data
                if (categoryData.hasOwnProperty('errors')) {
                    alert(categoryData.message)
                } else {
                    dispatch(addCategory(categoryData))
                }
            })
            .catch((err) => {
                //console.log('error in category',err.response.data.errors)
                alert(err.response.data.errors)
            })
    }
}

const addCategory = (data) => {
    return {
        type: "ADD_CATEGORY",
        payload: data
    }
}

export const asyncGetCategories = () => {
    return (dispatch) => {
        axios.get('http://localhost:3100/user/category', {
            headers: {
                'Authorization': localStorage.getItem('token')

            }
        })
            .then((response) => {
                const categoriesData = response.data
                if (categoriesData.hasOwnProperty('errors')) {
                    alert(categoriesData.message)
                } else {
                    dispatch(getCategories(categoriesData))
                }
            })
            .catch((err) => {
                alert(err.message)
            })
    }
}

const getCategories=(categoriesData)=>{
      return{
        type:"GET_CATEGORIES",
        payload:categoriesData
      }
}

export const asyncRemoveCategory=(id)=>{
    return(dispatch)=>{
        axios.delete(`http://localhost:3100/user/category/${id}`,{
            headers:{
                'Authorization':localStorage.getItem('token')
            }
        })
        .then((response)=>{
                const categoriesData=response.data
                if(categoriesData.hasOwnProperty('errors')){
                    alert(categoriesData.message)
                }else{
                    dispatch(removeCategory(categoriesData._id))
                }
        })
        .catch((err)=>{
            alert(err.message)
        })
    }
}

const removeCategory=(id)=>{
    return{
        type:"REMOVE_CATEGORY",
        payload:id
    }
}