import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { verifyEmail } from '../api/userApi'

const EmailVerifaction = () => {
    let params = useParams()
    console.log(params)
    let token = params.token
    let [success, setSuccess] = useState('')
    let [error, setError] = useState('')

    useEffect(() => {
        verifyEmail(token)
            .then(data => {
                if (data.error) {
                    setError(data.error)
                    setSuccess('')
                }
                else {
                    setSuccess(data.message)
                    setError('')
                }
            })
            .catch(error => console.log(error))
    }, [])

    const showError = () => {
        if (error) {
            return <div className="bg-red-200 tx-red-600 text-center py-2 text-x1">{error}</div>
        }
    }

    const showSuccess = () => {
        if (success) {
            return <div className="bg-green-200 tx-green-600 text-center py-2 text-x1">{success}</div>

        }
    }
    return (
        <>
            <div style={{ minHeight: '82vh' }}>
                {showError()}
                {showSuccess()}
            </div>
        </>
    )
}

export default EmailVerifaction