import React from 'react'
import { isAuthenticated } from '../api/userApi'
import { Navigate, Outlet } from 'react-router-dom'

const CustomerRoute = () => {
  return (
    <>
    {
        isAuthenticated() && isAuthenticated().user.role==="customer"?
        <Outlet/>
        :
        <Navigate to={'/login'}/>
    }
    
    </>
  )
}

export default CustomerRoute