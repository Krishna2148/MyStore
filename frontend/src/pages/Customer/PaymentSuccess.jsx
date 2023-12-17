import React, { useEffect, useState } from 'react'
import { isAuthenticated } from '../../api/userApi'
import { placeOrder } from '../../api/orderApi'

const PaymentSuccess = () => {
    let { user } = isAuthenticated()
    let shipping_info = JSON.parse(localStorage.getItem('shipping_info'))

    let [error, setError] = useState('')
    let [success, setSuccess] = useState(false)

    useEffect(() => {
        let order = {
            orderItems: JSON.parse(localStorage.getItem('cart_items')),
            user: user._id,
            ...shipping_info,
        }
        !success && 
        placeOrder(order)
            .then(data => {
                if (data.error) {
                    setError(data.error)
                }
                else {
                    setSuccess(true)
                    localStorage.removeItem('cart_items')
                }
            })
    }, [success])

    const showError = () => {
        if (error) {
            return <div className='py-5 text-red-600 text-center text-2xl'>{error}</div>
        }
    }
    const showSuccess = () => {
        if (success) {
            return <div className='py-5 text-red-600 text-center text-2xl'>Order Placed Successfully..!!</div>
        }
    }

    return (
        <>
            {showSuccess()}
            {showError()}
        </>
    )
}

export default PaymentSuccess