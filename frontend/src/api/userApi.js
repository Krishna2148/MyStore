import { API, API_USER } from "../config"

export const register = (username, email, password) => {
    let user = { username, email, password }
    return fetch(`${API_USER}/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
        .then(response => response.json())
        .catch(error => console.log(error))
}


export const verifyEmail = (token) => {
    return fetch(`${API_USER}/verifyEmail/${token}`)
        .then(response => response.json())
        .catch(error => console.log(error))
}

export const login = (email, password) => {
    let user = { email, password }
    return fetch(`${API_USER}/signin`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
        .then(response => response.json())
        .catch(error => console.log(error))
}

export const authenticate = (userinfo) => {
    return localStorage.setItem('jwt', JSON.stringify(userinfo))
}

export const isAuthenticated = () => {
    if (localStorage.getItem('jwt')) {
        return JSON.parse(localStorage.getItem('jwt'));
    }
    else {
        return false;
    }
}

export const forgetPassword = (email) => {
    return fetch(`${API_USER}/forgetpassword`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email })
    })
        .then(response => response.json())
        .catch(error => console.log(error))
}

export const resetPassword = (password, token) => {
    return fetch(`${API_USER}/resetpassword/${token}`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ password })
    })
        .then(response => response.json())
        .catch(error => console.log(error))
}

export const logout = () => {
    localStorage.removeItem('jwt')
    return fetch(`${API_USER}/signout`)
        .then(res => res.json())
        .catch(err => console.log(err))
}

export const getUserslist = () => {
    return fetch(`${API_USER}/getuserslist`)
        .then(res => res.json())
        .catch(error => console.log(error))
}

export const updateRole = (id, role,token) => {
    return fetch(`${API_USER}/updaterole/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify((role))
    })
        .then(res => res.json())
        .catch(error => console.log(error))
}