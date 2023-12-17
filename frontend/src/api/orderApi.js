import { API } from "../config"

// place order
export const placeOrder = (order) => {
    return fetch(`${API}/order/placeorder`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(order)
    })
        .then(res => res.json())
        .catch(error => console.log(error))
}

// getallorders
export const getallorders = () => {
    return fetch(`${API}/order/getallorders`) 
     .then(res=>res.json())
     .catch(error => console.log(error))
}

// getuserorders
export const getuserorders = (userid) => {
    return fetch(`${API}/order/getuserorders/${userid}`)
        .then(res => res.json())
        .catch(error => console.log(error))
}

// getorderdetails
export const getorderdetails = (orderid) => {
    return fetch(`${API}/order/getorderdetails/${orderid}`)
        .then(res => res.json())
        .catch(error => console.log(error))
}

