import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { isAuthenticated, logout } from '../api/userApi'
import {useSelector} from 'react-redux'

const Header = () => {
    let { user } = isAuthenticated()
    let [success, setSuccess] = useState(false)
    let navigate = useNavigate()

    const handleLogout = () => {
        logout()
            .then(data => {
                if (data.error) {
                    console.log(data.error)
                }
                else {
                    setSuccess(true)
                }
            })
    }

    const redirect = () => {
        if (success) {
            setSuccess(false)
            navigate('/')
        }
    }

    let cart_count = useSelector(state => state.cart.cart_items.length)

    return (
        <>
            {redirect}
            <header className='container-fluid'>
                <nav className='row list-unstyled bg-dark text-white'>
                    <li className='col-md-3 pt-2 pb-1'>
                        <Link to={'/'} className='text-decoration-none'>
                            <h3 className='text-white fw-bold text-center'>
                                OUR STORE
                            </h3>
                        </Link>
                    </li>
                    <li className='col-md-6 d-flex py-2'>
                        <input type="text" className='form-control rounded-end-0' />
                        <button className='btn btn-warning rounded-start-0'>Search</button>
                    </li>
                    <li className='col-md-3 fs-3 d-flex justify-content-evenly pt-2 pb-1'>
                        {
                            user ?
                                <>
                                    {user.role === "admin" ?
                                        <>
                                            <Link to={'/admin'}><i className='bi bi-speedometer'></i></Link>
                                        </>
                                        :
                                        <>
                                            <Link to={'/userprofile'}><i className="bi bi-person-circle"></i></Link>
                                            <Link to={'/cart'} className='position-relative'>
                                                <i className="bi bi-cart text-white"></i>
                                                <span className="position-relative top-0 start-0 translate-middle
                                        badge rounded-pill bg-warning fs-6">
                                                        {cart_count > 0 && cart_count}
                                                </span>
                                            </Link>
                                        </>
                                    }
                                    <span><i className="bi bi-box-arrow-right" onClick={handleLogout}></i></span>
                                </>
                                :
                                <>
                                    <Link to={'/login'}><i className="bi bi-box-arrow-in-left text-white"></i></Link>
                                    <Link to={'/Register'}><i className="bi bi-person-plus text-white "></i></Link>
                                </>
                        }
                        {/* <Link to={'/cart'}><i className="bi bi-cart text-white"></i></Link> */}
                    </li>
                </nav>
            </header>

            <nav className='list-unstyled d-md-flex justify-content-evenly bg-secondary text-center'>
                <li><Link to={'/'} className='text-white text-decoration-none'>Home</Link></li>
                <li><Link to={'/products'} className='text-white text-decoration-none'>Products</Link></li>
                <li><Link to={'/services'} className='text-white text-decoration-none'>Services</Link></li>
                <li><Link to={'/about'} className='text-white text-decoration-none'>About</Link></li>
                <li><Link to={'/contact'} className='text-white text-decoration-none'>Contact</Link></li>
            </nav>
        </>
    )
}

export default Header