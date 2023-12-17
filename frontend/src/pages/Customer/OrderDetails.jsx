import React, { useEffect, useState } from 'react'
import { API } from '../../config'
import { Link, useParams } from 'react-router-dom'
import { getorderdetails } from '../../api/orderApi'
import { isAuthenticated } from '../../api/userApi'

const OrderDetails = () => {
    let { id } = useParams()
    let [order, setOrder] = useState({})
    let { user } = isAuthenticated()

    useEffect(() => {
        getorderdetails(id)
            .then(data => {
                if (data.error) {
                    console.log(data.error)
                }
                else {
                    setOrder(data)
                }
            })
    }, [])
    return (
        <div className="p-5">
            <h1 className="text-2xl underline">Order Details</h1>
            <div className="flex">
                <div className="w-1/2 p-5">
                    <h2>Order Id:{order._id}</h2>
                    <h2>Grand Price: Rs.{order.total}</h2>
                    <h2>Status: {order.status}</h2>
                    <h2>Order Items</h2>
                    <div className="flex flext-wrap">
                        {
                            order?.orderItems?.length > 0 &&
                            order?.orderItems?.map(item => {
                                return <div className="border-1 rounded-sm p-3">
                                    <img src={`${API}/${item.product.image}`} alt={item.product.image} className="w-52 h-52 p-3" />
                                    <h2>Product: {item.product.title}</h2>
                                    <h2>Quantity:{item.quantity}</h2>
                                    <h2>Unit Price: Rs.{item.quantity.price}</h2>
                                    <h2>Total: Rs.{item.product.price * item.quantity}</h2>
                                </div>
                            })
                        }
                    </div>
                </div>
                <div className="w-1/2 p-5">
                    <h1>Ship To : {order.contact_person}</h1>
                    <h1>Street : {order.street}</h1>
                    <h1>City : {order.city}</h1>
                    <h1>Postal Code : {order.postal_code}</h1>
                    <h1>State : {order.state}</h1>
                    <h1>Phone : {order.phone}</h1>

                </div>
                <div className="w-1/4 m-auto flex justify-between">
                    {
                        user && user.role == "admin" &&
                        <button>Process Order</button>
                    }
                    {
                        user &&
                        <button>Cancle Order</button>
                    }
                </div>
            </div>
            <Link to={`/userprofile`}>Go Back</Link>
        </div>
    )
}

export default OrderDetails