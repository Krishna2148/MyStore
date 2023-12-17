import React, { useEffect, useState } from 'react'
import { Outlet, useParams } from 'react-router-dom'
import AdminSidebar from './AdminSidebar'


const AdminLayout = () => {
    let [item, setItem] = useState('')

    const getUrlParams = async () => {
        let path = await window.location.href
        if (path.match(/categories/)) {
            return 'category'
        }
        else if (path.match(/products/)) {
            return 'products'
        }
        else if (path.match(/users/)) {
            return 'users'
        }
        else if (path.match(/orders/)) {
            return 'orders'
        }
        else {
            return 'dashboard'
        }
    }
    useEffect(() => {
        getUrlParams()
            .then(data => setItem(data))
    }, [useParams()])
    return (
        <div className='flex'>
            <div className='w-1/4 bg-slate-400'>
                <AdminSidebar active={item} />
            </div>
            <div className='w-3/4 bg-slate-200'>
                <Outlet />
            </div>


        </div>
    )
}

export default AdminLayout