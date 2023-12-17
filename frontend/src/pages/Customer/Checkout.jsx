import React, { useReducer } from 'react'
import { saveShippingInfo } from '../../reducers/cartAction'
import { useDispatch } from 'react-redux/'
import {  useNavigate } from 'react-router-dom'



const CheckOut = () => {
    const personReducer = (state, e) => {
        return { ...state, [e.target.name]: e.target.value }
    }
    let [person, setPerson] = useReducer(personReducer, 
        localStorage.getItem('shipping_info')?JSON.parse(localStorage.getItem('shipping_info')):{})
    
        let {contact_person,street,city,postal_code,state,country,phone}=person

    const dispatch = useDispatch()
    const navigate=useNavigate()
    const handleShippingInfo = e => {
        e.preventDefault()
        dispatch(saveShippingInfo(person))
        return navigate('payment')
    }
    return (
        <>
            <form className="checkout_form">
                <label htmlFor="contact">Contact Person</label>
                <input type="text" name="contact_person" id="contact" onChange={setPerson} value={contact_person}/>

                <label htmlFor="street">Street</label>
                <input type="street" name="street" id="street" onChange={setPerson} value={street}/>

                <label htmlFor="city">City</label>
                <input type="text" name="city" id="city" onChange={setPerson} value={city}/> 

                <label htmlFor="postal_code">Postal Code</label>
                <input type="text" name="postal_code" id="postal_code" onChange={setPerson} value={postal_code} />

                <label htmlFor="state">State</label>
                <input type="text" name="state" id="state" onChange={setPerson} value={state}/>

                <label htmlFor="country">Country</label>
                <input type="text" name="country" id="country" onChange={setPerson} value={country}/>

                <label htmlFor="phone">Phone</label>
                <input type="text" name="phone" id="phone" onChange={setPerson} value={phone}/>

                <button onClick={handleShippingInfo} className="btn btn-primary button m-2">Proceed To Payment</button>
            </form>
        </>
    )
}

export default CheckOut