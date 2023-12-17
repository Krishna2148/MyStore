import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getallorders } from '../../api/orderApi'

const OrdersMain = () => {
    let [orders, setOrders] = useState('')

    useEffect(() => {
        getallorders()
            .then(data => {
                if (data.error) {
                    console.log(data.error)
                }
                else {
                    setOrders(data)
                }
            })
    }, [])
    return (
        <div className='p-5 text-center text-3xl'>
            <table className='text-xl m-auto'>
                <thead>
                    <tr>
                        <td>S.No</td>
                        <td>Order Id</td>
                        <td>Placed On</td>
                        <td>Order Total</td>
                        <td>Status</td>
                        <td>View Details</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        orders.length > 0 &&
                        orders.map((order, i) => {
                            return <tr key={i}>
                                <td>{i + 1}</td>
                                <td>{order._id}</td>
                                <td>{order.createdAt}</td>
                                <td>{order.total}</td>
                                <td>{order.status}</td>
                                <td><Link to={`/orders/${order._id}`}>View Details</Link></td>
                            </tr>
                        })
                    }
                </tbody>
            </table>

        </div>
    )
}

export default OrdersMain