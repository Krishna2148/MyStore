import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { authenticate, isAuthenticated, login } from '../api/userApi'

const LoginForm = () => {
    let [ email, setEmail ] = useState('')
    let [ password, setPassword ] = useState('')

    let [error, setError] = useState('')
    let [success, setSuccess] = useState(false)
    let {user} = isAuthenticated()

    let navigate = useNavigate()

    const handleLogin = e => {
        e.preventDefault();
        login(email, password)
            .then(data => {
                if (data.error) {
                    setError(data.error)
                }
                else {
                    authenticate(data)
                    setSuccess(true)
                }
            })
    }

    const showError = () => {
        if (error) {
            return <div className="bg-red-200 text-red-600 text-center py-2">{error}</div>
        }
    }

    const redirect = () => {
        if (success) {
            if(user.role === 'admin'){
                return navigate('/admin')
            }
            return navigate('/')
        }
    }
    return (
        <>
            <main className="form-signin w-50 m-auto p-4">
                {showError()}
                {redirect()}
                <form>
                    <div className="text-center">
                        <img className="mb-4 " src="./login.webp" alt="" width="72" height="57" />
                    </div>
                    <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

                    <div className="form-floating">
                        <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com"
                            onChange={e => setEmail(e.target.value)} />
                        <label htmlFor="floatingInput">Email address</label>
                    </div>
                    <div className="form-floating">
                        <input type="password" className="form-control" id="floatingPassword" placeholder="Password"
                            onChange={e => setPassword(e.target.value)} />
                        <label htmlFor="floatingPassword">Password</label>
                    </div>

                    <div className="checkbox mb-3">
                        <label>
                            <input type="checkbox" value="remember-me" /> Remember me
                        </label>
                    </div>
                    <button className="w-100 btn btn-lg btn-primary text-dark" type="submit"
                        onClick={handleLogin}>Login</button>
                    <div>not registered yet? <Link className='text-primary' to="/Register">Register</Link> <Link className='text-primary m-20' to="/forgetpassword">Forget Password</Link></div>
                    <p className="mt-5 mb-3 text-body-secondary">&copy; 2017–2023</p>
                </form>
            </main>
        </>
    )
}

export default LoginForm