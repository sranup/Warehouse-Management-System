import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { asyncGetProfile, asyncUpdateProfile } from '../action/profileAction'

const Profile = (props) => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [profileUrl, setprofileUrl] = useState('')
    const [image, setImage] = useState('')

    const dispatch = useDispatch()

    const profileData = useSelector((state) => {
        return state.profile
    })

    useEffect(() => {
        dispatch(asyncGetProfile())
    }, [dispatch])

    const handleUpdate = (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('name', name)
        formData.append('email', email)
        formData.append('profileUrl', profileUrl)
        formData.append('image', image)
        dispatch(asyncUpdateProfile(profileData._id, formData))
        setName('')
        setEmail('')
        setprofileUrl('')
        setImage('')
    }


    return (
        <div className='row mt-5'>
            <div className='col-md-12 d-flex justify-content-center mt-5'>
                <div className="card text-center" style={{ width: '22rem' }}>
                    <div className="card-header">
                        Profile Info
                    </div>
                    <div className="card-body">
                        <div className="row my-2">
                            <div className="col d-flex justify-content-center"><img src={`http://localhost:3100/${profileData.image}`} style={{ width: '150px', height: '150px', borderRadius: '75px' }} alt="userPic" /></div>
                        </div>
                        <p>Name:{profileData.name}</p>
                        <p>Email:{profileData.email}</p>
                        <p>Profile URL:{profileData.profileUrl}</p>
                        <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#profileUpdateModal">
                            Profile Update
                        </button>
                    </div>
                </div>
            </div>
            <div className="modal fade" id="profileUpdateModal" tabindex="-1" aria-labelledby="profileUpdateModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="profileUpdateModalLabel">Update Profile</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div>
                                <label className='d-flex justify-content-left mt-2'>Name:</label>
                                <input className='form-control' type="text" value={name} onChange={(e) => setName(e.target.value)} />
                            </div>
                            <div>
                                <label className='d-flex justify-content-left'>Email:</label>
                                <input className='form-control' type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div>
                                <label className='d-flex justify-content-left mt-2'>Profile URL:</label>
                                <input className='form-control' type="text" value={profileUrl} onChange={(e) => setprofileUrl(e.target.value)} />
                            </div>
                            <div>
                                <label className='d-flex justify-content-left mt-2'>Image Upload:</label>
                                <input className='form-control' type="file" onChange={(e) => setImage(e.target.files[0])} />
                            </div>
                            <div className='mt-3'>
                                <button className='btn btn-primary' data-bs-dismiss="modal" onClick={handleUpdate}>Update</button>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile