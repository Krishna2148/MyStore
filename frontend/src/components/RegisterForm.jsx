
import React, { useState } from 'react'
import { register } from '../api/userApi'
import { Link } from 'react-router-dom'

const Register = () => {
    let [username, setUsername] = useState('')
    let [email, setEmail] = useState('')
    let [password, setPassword] = useState('')

    let [error, setError] = useState('')
    let [success, setSuccess] = useState(false)


    const handleSubmit = (e) => {
        e.preventDefault()
        register(username, email, password)
            .then(data => {
                if (data.error) {
                    setError(data.error)
                    setSuccess(false)
                }
                else {
                    setError('')
                    setSuccess(true)
                }
            })
    }

    const showError = () => {
        if (error) {
            return <div className="bg-red-200 text-center text-3xl py-2 text-red-600">{error}</div>
        }
    }
    const showSuccess = () => {
        if (success) {
            return <div className="bg-green-200 text-center text-3xl py-2 text-green-600">User registered successfully</div>
        }
    }

    return (
        <>
            <main className="form-signin w-50 m-auto p-4">

                <form>
                    <div className="text-center">
                        <img className="mb-4 " src="./login.webp" alt="" width="72" height="57" />
                    </div>
                    {showSuccess()}
                    {showError()}
                    <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

                    <div className="form-floating">
                        <input type="text" className="form-control" id="floatingInput1" placeholder="username"
                            onChange={(event) => {
                                setUsername(event.target.value);
                            }} />
                        <label htmlFor="floatingInput">User Name</label>
                    </div>
                    <div className="form-floating">
                        <input type="email" className="form-control" id="floatingInput2" placeholder="name@example.com"
                            onChange={(event) => {
                                setEmail(event.target.value);
                            }} />
                        <label htmlFor="floatingInput">Email address</label>
                    </div>
                    <div className="form-floating">
                        <input type="password" className="form-control" id="floatingPassword3" placeholder="Password"
                            onChange={(event) => {
                                setPassword(event.target.value);
                            }} />
                        <label htmlFor="floatingPassword">Password</label>
                    </div>

                    <div className="checkbox mb-3">
                        <label>
                            <input type="checkbox" value="remember-me" /> i accept terms and conditions
                        </label>
                    </div>
                    <button className="w-100 btn btn-lg btn-primary text-dark" type="submit"
                        onClick={handleSubmit}>Register</button>
                        <div>already have account?<Link className='text-primary' to='/Login'>Login</Link></div>
                    <p className="mt-5 mb-3 text-body-secondary ">&copy; 2017–2023</p>
                </form>
            </main>
        </>
    )
}
export default Register