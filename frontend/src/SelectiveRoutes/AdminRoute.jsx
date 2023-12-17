import React from 'react'
import { isAuthenticated } from '../api/userApi'
import { Navigate, Outlet } from 'react-router-dom'

const AdminRoute = () => {
  return (
    <>
    {
        isAuthenticated() && isAuthenticated().user.role==="admin"?
        <Outlet/>
        :
        <Navigate to={'/login'}/>
    }
    
    </>
  )
}

export default AdminRoute