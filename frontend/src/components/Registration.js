import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { asyncRegisterUser } from '../action/userAction'
import { useState } from 'react'

const Registation = (props) => {
    const [serverErrors,setServerErrors]=useState([])

    const handleServerErrors=(errorData)=>{
        setServerErrors(errorData)

    }
    
    
    const handleRedirect = () => {
       props.history.push('/login')
    }


    const user = useSelector((state) => {
        return state.user
    })

    console.log('user',user)

    const initialValues = {
        username: '',
        email: '',
        password: ''
    }


    const validationSchema = Yup.object({
        username: Yup.string(),
        email: Yup.string(),
        password: Yup.string()
    })

    const dispatch = useDispatch()

    const handleSubmit = (values, { resetForm }) => {
        const formData={
            username:values.username,
            email:values.email,
            password:values.password
        }
        //console.log('formdata',formData)
        dispatch(asyncRegisterUser(formData,handleRedirect,handleServerErrors))
        resetForm()
    }


    return (

        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit} >
            <div className='col-md-12 d-flex justify-content-center mt-5'>
                <div className="card text-center" style={{ width: '22rem' }}>
                    <div className="card-header">
                        <h4>Please register here</h4>
                    </div>
                    <div className="card-body">
                        <Form>
                            <div>
                                <label className='d-flex justify-content-left' htmlFor="username">Username:</label>
                                <Field className='form-control card-title' id="username" name="username" />
                                <ErrorMessage name="username" />
                               
                                {
                                    serverErrors.length > 0 &&  <div className='error'>{serverErrors.find((ele)=>ele.path=='username')?.msg}</div>
                                }
                            </div>
                            <div>
                                <label className='d-flex justify-content-left' htmlFor="email">Email</label>
                                <Field className='form-control card-title' type="email" id="email" name="email" />
                                <ErrorMessage name="email" />
                                {
                                    serverErrors.length > 0 &&  <div className='error'>{serverErrors.find((ele)=>ele.path=='email')?.msg}</div>
                                }
                                
                            </div>
                            <div>
                                <label className='d-flex justify-content-left' htmlFor="password">Password:</label>
                                <Field className='form-control card-title' type="password" id="password" name="password" />
                                <ErrorMessage name="password" />
                                {
                                    serverErrors.length > 0 &&  <div className='error'>{serverErrors.find((ele)=>ele.path=='password')?.msg}</div>
                                }
                            </div>
                            <div className='mt-2'>
                                <button className='btn btn-success' type="submit">Register</button>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        </Formik>
    )
}

export default Registation