import React, { useState } from 'react'
import { forgetPassword } from '../api/userApi'
import { Link } from 'react-router-dom'

const ForgetPassword = () => {
    let [email, setEmail] = useState('')
    let [error, setError] = useState('')
    let [success, setSuccess] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        forgetPassword(email)
            .then(data => {
                if (data.error) {
                    setError(data.error)
                    setSuccess('')
                }
                else {
                    setSuccess(data.message)
                    setError()
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
            return <div className="bg-green-200 text-center text-3xl py-2 text-green-600">{success}</div>
        }
    }

    return (
        <>
            <main className="form-signin w-50 m-auto p-4">
                {showSuccess}
                {showError}

                <form>
                    <div className="text-center">
                        <img className="mb-4 " src="./login.webp" alt="" width="72" height="57" />
                    </div>
                    <h1 className="h3 mb-3 fw-normal">Forget Password</h1>

                    <div className="form-floating">
                        <input type="text" className="form-control" id="floatingInput" placeholder="name@example.com"
                        onChange={e => setEmail(e.target.value)} 
                        />
                        <label htmlFor="floatingInput">Email</label>
                    </div>

                    <button className="w-100 btn btn-lg btn-primary text-dark" type="submit"
                        onClick={handleSubmit}>Send Email</button>
                    <div>not registered yet? <Link className='text-primary' to="/Register">Register</Link></div>
                    <p className="mt-5 mb-3 text-body-secondary">&copy; 2017–2023</p>
                </form>
            </main>

        </>
    )
}

export default ForgetPassword