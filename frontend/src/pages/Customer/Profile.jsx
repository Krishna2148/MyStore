import React, { useEffect, useState } from 'react'
import { isAuthenticated } from '../../api/userApi'
import { getuserorders } from '../../api/orderApi'
import { Link } from 'react-router-dom'

const Profile = () => {

    let { user } = isAuthenticated()
    let [myOrders, setMyOrders] = useState([])
    let [error, setError] = useState('')

    useEffect(() => {
        getuserorders(user._id)
            .then(data => {
                if (data.error) {
                    setError(data.error)
                }
                else {
                    setMyOrders(data)
                }
            })
    }, [])
    return (
        <div className="p-5">
            <h1 className="text-2xl">Welcome {user.username}!</h1>
            <h1 className='text-xl font-bold underline'>My Orders</h1>
            <div className="flex flex-wrap justify-evenly">
                {
                    setMyOrders.length > 0 &&
                    myOrders.map(order => {
                        return <div className="border border-gray-300 rounded-md w-1/3 p-5 m-2">
                            <h1>Order Id: <Link className='text-blue-300 hover:text-blue-600' to={`/orders/${order._id}`}>{order.id} </Link>
                            </h1>
                            <h2>Order Items: Rs.
                                {
                                    order.orderItems.map(item => { return <li>{item.product.title}</li> })
                                }
                            </h2>
                            <h2>Total Amount: Rs. {order.total}</h2>
                            <h2>Order Status: Rs. {order.status}</h2>
                            <h2>Deliver To: {order.contsct_person}</h2>
                            <Link className='text-blue-300 hover:text-blue-600' to={`/orders/${order._id}`}> View Details</Link>
                        </div>
                    })
                }
            </div>

        </div>
    )
}

export default Profile