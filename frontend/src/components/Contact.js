import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import swal from 'sweetalert'

const Contact = (props) => {

    const initialValues = {
        email: '',
        mobileNumber: ''
    }

    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email address').required('Required'),
        mobileNumber: Yup.string().min(10, 'Mobile number must be 10 characters').required('Required')
    })

    const handleSubmit = ({ resetForm }) => {
        swal('Thanks for the details','we will contact you shortly')
        resetForm()
    }
    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
            <div className='col-md-12 d-flex justify-content-center mt-5'>
                <div className="card text-center" style={{ width: '22rem' }}>
                    <div className="card-header">
                        <h4>Fill the details</h4>
                    </div>
                    <div className="card-body">
                        <Form>
                            <div>
                                <label className='d-flex justify-content-left' htmlFor="email">Email</label>
                                <Field className='form-control' type="email" id="email" name="email" />
                                <ErrorMessage name="email" />
                            </div>
                            <div>
                                <label className='d-flex justify-content-left' htmlFor="email">Mobile Number</label>
                                <Field className='form-control' type="text" id="mobileNumber" name="mobileNumber" />
                                <ErrorMessage name="mobileNumber" />
                            </div>
                            <div className='mt-2'>
                                <button className='btn btn-success' type="submit">Submit</button>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        </Formik>
    )
}

export default Contact