import React from 'react'
//import { Link, Route, withRouter,useNavigate } from 'react-router-dom'
import {Link,Route,withRouter,useNavigate} from 'react-router-dom'
import Login from './Login'
import Registation from './Registration'
import Home from './Home'
import Settings from './Settings'
import Profile from './Profile'
import AboutUs from './AboutUs'
import Contact from './Contact'
import Shipment from './Shipment'


const NavBar = (props) => {
    
    const { userLoggedIn, handleAuth } = props
    return (
        <div>
            {userLoggedIn ? (
                <>
                    <div className='row'>
                        <nav className="navbar navbar-dark bg-dark fixed-top">
                            <div className="container-fluid">
                                <h2 className="navbar-brand">WELCOME TO WAREHOUSE MANAGEMENT</h2>
                                <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar">
                                    <span className="navbar-toggler-icon"></span>
                                </button>
                                <div className="offcanvas offcanvas-end text-bg-dark" id="offcanvasDarkNavbar" aria-labelledby="offcanvasDarkNavbarLabel">
                                    <div className="offcanvas-header">
                                        <h5 className="offcanvas-title" id="offcanvasDarkNavbarLabel">Menu</h5>
                                        <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                                    </div>
                                    <div className="offcanvas-body">
                                        <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">

                                            <li className='nav-item'>
                                                <Link style={{ textDecoration: 'none' }} className="nav-link" aria-current="page" to="/home">Dashboard</Link>

                                            </li>

                                            <li className='nav-item'>
                                                <Link style={{ textDecoration: 'none' }} className="nav-link" to="/settings">Product Category</Link>
                                            </li>
                                            <li className='nav-item'>
                                                <Link style={{ textDecoration: 'none' }} className="nav-link" to="/shipment">Shipment</Link>
                                            </li>
                                            <li className='nav-item'>
                                                <Link style={{ textDecoration: 'none' }} className="nav-link" to="/profile">Profile</Link>
                                            </li>
                                            <li className='nav-item'>
                                                <Link style={{ textDecoration: 'none' }} className="nav-link" onClick={() => {
                                                    localStorage.removeItem('token')
                                                    alert('successfully logged out')
                                                    handleAuth()
                                                    props.history.push("/login")
                                                }}>Logout</Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </nav>
                    </div>
                </>
            ) : (
                <>
                    <nav className="navbar justify-content-end">
                        <ul className="nav">
                            <li className="nav-item">
                                <Link style={{ textDecoration: 'none', color: 'white' }} className="nav-link" aria-current="page" to="/about">AboutUs</Link>
                            </li>
                            <li className="nav-item"><Link style={{ textDecoration: 'none', color: 'white' }} className="nav-link" aria-current="page" to="/contact">Contact</Link></li>
                            <li className="nav-item"><Link style={{ textDecoration: 'none', color: 'white' }} className="nav-link" aria-current="page" to="/register">Register</Link></li>
                            <li className="nav-item"><Link style={{ textDecoration: 'none', color: 'white' }} className="nav-link" aria-current="page" to="/login">Login</Link></li>
                        </ul>

                    </nav>

                </>

            )}
            <div>
                <Route path="/register" component={Registation} exact={true} />
                <Route path="/login" render={(props) => {
                    return (
                        <Login {...props} handleAuth={handleAuth} />
                    )
                }} exact={true} />
                <Route path="/home" component={Home} exact={true} />
                <Route path="/about" component={AboutUs} exact={true} />
                <Route path="/contact" component={Contact} exact={true} />
                <Route path="/profile" component={Profile} exact={true} />
                <Route path="/settings" component={Settings} exact={true} />
                <Route path="/shipment" component={Shipment} exact={true} />
            </div>
        </div>
    )
}

const wrappedComponent = withRouter(NavBar)
export default wrappedComponent