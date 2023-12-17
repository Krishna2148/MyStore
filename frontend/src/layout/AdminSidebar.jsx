import React from 'react'
import { Link } from 'react-router-dom'

const AdminSidebar = (active) => {
    return (
        <>
            {
                active === "dashboard" ?
                    <li className="menu-active"><Link to='/admin'>Dashboard</Link></li>
                    :
                    <li><Link to='/admin'>Dashboard</Link></li>

            }
            {
                active === "category" ?
                    <li className="menu-active"><Link to='/admin/categories'>Categories</Link></li>
                    :
                    <li><Link to='/admin/categories'>Categories</Link></li>
            }
            {
                active === "products" ?
                    <li className="menu-active"><Link to='/admin/products'>Products</Link></li>
                    :
                    <li><Link to='/admin/products'>Products</Link></li>
            }
            {
                active === "users" ?
                    <li className="menu-active"><Link to='/admin/users'>Users</Link></li>
                    :
                    <li><Link to='/admin/users'>Users</Link></li>

            }
            {
                active === "orders" ?
                    <li className="menu-active"><Link to='/admin/orders'>orders</Link></li>
                    :
                    <li><Link to='/admin/orders'>orders</Link></li>

            }

        </>
    )
}

export default AdminSidebar