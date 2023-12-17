import React, { useState } from 'react'
import { API } from '../../config'
import { useSelector } from 'react-redux/es/hooks/useSelector'
import { useDispatch } from 'react-redux/'
import { removeFromCart, updateCart } from '../../reducers/cartAction'
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom'

const Cart = () => {
    let cart_items = useSelector(state => state.cart.cart_items)

    // let [total, setTotal] = useState(sessionStorage.getItem('total'))

    const dispatch = useDispatch()

    const handleRemove = id => e => {
        dispatch(removeFromCart(id))
    }

    const handleDecrease = item => e => {
        let quantity = item.quantity
        if (quantity <= 1) {
            Swal.fire('Warning', 'cannot decrease quantity Try remove', 'error')
        }
        else {

            let updatedProduct = { ...item, quantity: quantity - 1 }
            dispatch(updateCart(updatedProduct))
        }
    }

    const handleIncrease = item => e => {
        let quantity = item.quantity + 1
        if (quantity >= item.count_in_stock) {
            Swal.fire('warning', 'Item maximum reached', 'error')
        }
        else {
            let updatedProduct = { ...item, quantity: quantity }
            dispatch(updateCart(updatedProduct))
            Swal.fire('sss', 'Quantity updated', 'success')
        }
    }


    let individualTotals = cart_items.length > 0 ? cart_items.map(item => {
        return item.quantity * item.price
    }) : []

    let total_calc = individualTotals.length > 0 ? individualTotals.reduce((acc, cur) => acc + cur) : 0

    sessionStorage.setItem('total', total_calc)

    let total = sessionStorage.getItem('total')

    return (
        <>
            <h1 className="text-center text-2xl mt-5 font-bold underline mb-3"></h1>
            {cart_items.length > 0 ?
                <>
                    <table className="m-auto">
                        <thead>
                            <tr>
                                <td>S.No</td>
                                <td colspan={2}>Product</td>
                                <td>Unit Price</td>
                                <td>Quantity</td>
                                <td>Total</td>
                                <td>Action</td>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                cart_items.length > 0 &&
                                cart_items.map((cartItem, i) => {
                                    return <tr key={cartItem.product}>
                                        <td>{i + 1}</td>
                                        <td>
                                            <img src={`${API}/${cartItem.image}`} alt="" />
                                        </td>
                                        <td>{cartItem.title}</td>
                                        <td>Rs.{cartItem.price}</td>
                                        <td>
                                            <div className="flex">
                                                <button className="button update rounded-s-md" onClick={handleDecrease(cartItem)}>-</button>
                                                <div className="p-2">
                                                    {cartItem.quantity}</div>
                                                <button className="button add rounded-s-md" onClick={handleIncrease(cartItem)}>+</button>
                                            </div>
                                        </td>
                                        <td>{cartItem.price * cartItem.quantity}</td>
                                        <td>
                                            <button className="delete button rounded-md p-2" onClick={handleRemove(cartItem.product)}>Remove</button>
                                        </td>
                                    </tr>
                                })
                            }
                            <tr>
                                <td colspan={5} className="text-right">
                                    Grand Total
                                </td>
                                <td>Rs.{total}</td>
                            </tr>
                        </tbody>
                    </table>
                    <Link to={'/checkout'} className='button update'>Proceed to Checkout</Link>
                </>
                :
                <div className="text-center p-5 text-2xl font-bold m-5">No Items In Cart</div>
            }
        </>
    )
}

export default Cart