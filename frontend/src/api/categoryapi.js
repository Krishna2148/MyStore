import { API, API_CATEGORY } from "../config";


export const getAllCategories = () => {
    return fetch(`${API}/category/getallcategories`)
        .then(response => response.json())
        .catch(error => console.log(error))
}

export const addCategory = (category_name, token) => {
    return fetch(`${API_CATEGORY}/addcategory`, {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json',
            "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({category_name})
    })
        .then(response => response.json())
        .catch(error => console.log(error))
}

export const editCategory = (id, category_name, token) => {
    return fetch(`${API_CATEGORY}/updatecategory/${id}`, {
        method: 'PUT',
        headers: {
            "Content-Type": 'application/json',
            "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({category_name})
    })
        .then(response => response.json())
        .catch(error => console.log(error))
}
export const getCategoryDetails = (id) => {
    return fetch(`${API_CATEGORY}/getcategorydetails/${id}`,)
        .then(response => response.json())
        .catch(error => console.log(error))
}

export const deleteCategory = (id,token) => {
    return fetch(`${API_CATEGORY}/deletecategory/${id}`,{
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            "Authorization":`Bearer ${token}`
    }
    })
        .then(response => response.json())
        .catch(error => console.log(error))
}