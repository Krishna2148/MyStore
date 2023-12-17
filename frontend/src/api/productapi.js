import { API } from "../config"

export const getAllproducts = () => {
    return fetch(`${API}/product/getallproducts`)
        .then(response => response.json())
        .catch(error => console.log(error))
}

export const addProduct = (token, product) => {
    return fetch(`${API}/product/addproduct`,{
        method: 'POST',
        headers: {
            //  'Content-Type': 'application'
            authentication: `Bearer ${token}`
            },
            body:product
    })
    .then(res=>res.json())
    .catch(error => console.log(error))
}


export const getProduct =(id)=>{
    return fetch(`${API}/product/getproductdetails/${id}`)
    .then(res=>res.json())
    .catch(error => console.log(error))
}

export const updateProduct = (token,id,product) => {
    return fetch(`${API}/product/updateproduct/${id}`,{
        method: 'PUT',
        headers: {
            //  'Content-Type': 'application'
            authentication: `Bearer ${token}`
            },
            body:product
    })
    .then(res=>res.json())
    .catch(error => console.log(error))
}
export const getfilteredproducts = (filters,sortBy,limit)=>{
    return fetch(`${API}/product/getfilterproduct?sortBy=${sortBy}&limit=${limit}`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },body: JSON.stringify(filters)
    })
    .then(res=>res.json())
    .catch(error => console.log(error))
}

export const getRelatedProducts =(product)=>{
    return fetch(`${API}/product/getRelatedProducts/${product}`)
    .then(res=>res.json())
    .catch(error => console.log(error))
}


