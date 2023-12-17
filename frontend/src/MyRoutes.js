// rfc, rfce, rafc, rafce
// import React from 'react'

// export default function MyRoutes() {
//   return (
//     <div>MyRoutes</div>
//   )
// }


// import React from 'react'

// function MyRoutes() {
//   return (
//     <div>MyRoutes</div>
//   )
// }

// export default MyRoutes

// import React from 'react'

// export const MyRoutes = () => {
//   return (
//     <div>MyRoutes</div>
//   )
// }
// more than one component can be exported

// import React from 'react'

// const MyRoutes = () => {
//   return (
//     <div>MyRoutes</div>
//   )
// }

// export default MyRoutes
// there can be only one default export

import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import First from './First'
import Layout from './layout/Layout'
import Test from './Test'
import Home from './pages/Home'
import Contact from './pages/Contact'
import Register from './components/RegisterForm'
import LoginForm from './components/Login'
import EmailVerifaction from './pages/EmailVerifaction'
import ForgetPassword from './pages/ForgetPassword'
import ResetPassword from './pages/ResetPassword'
import AdminLayout from './layout/AdminLayout'
import AdminDashboard from './pages/Admin/AdminDashboard'
import AdminCategories from './pages//Admin/AdminCategories'
import AddCategory from './pages/Admin/AddCategory'
import UpdateCategory from './pages/Admin/UpdateCategory'
import ProductsMain from './pages/Admin/Products/ProductsMain'
import AddProduct from './pages/Admin/Products/AddProduct'
import UpdateProduct from './pages/Admin/Products/UpdateProduct'
import AdminRoute from './SelectiveRoutes/AdminRoute'
import CustomerRoute from './SelectiveRoutes/CustomerRoute'
import Products from './pages/Customer/Products'
import ProductDetails from './pages/Customer/ProductDetails'
import Cart from './pages/Customer/Cart'
import CheckOut from './pages/Customer/Checkout'
import PaymentMain from './pages/Customer/PaymentMain'
import PaymentSuccess from './pages/Customer/PaymentSuccess'
import Profile from './pages/Customer/Profile'
import OrderDetails from './pages/Customer/OrderDetails'
import UsersMain from './pages/Admin/UsersMain'
import OrdersMain from './pages/Admin/OrdersMain'

const MyRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Layout />}>
                    {/* <Route path='/' element = {<Home/>} /> */}
                    <Route index element={<Home />} />
                    <Route path='contact' element={<Contact />} />
                    <Route path='register' element={<Register></Register>}></Route>
                    <Route path='login' element={<LoginForm />}></Route>
                    <Route path='emailverification/:token' element={<EmailVerifaction />}></Route>
                    <Route path='forgetpassword' element={<ForgetPassword />}></Route>
                    <Route path='resetpassword/:token' element={<ResetPassword />}></Route>
                    <Route path='products' element={<Products/>}/>


                    {/* admin */}
                    <Route path='/' element={<AdminRoute />}>
                        <Route path='admin' element={<AdminLayout />}>
                            <Route index element={<AdminDashboard />} />
                            <Route path='categories' element={<AdminCategories />} />
                            <Route path='categories/add' element={<AddCategory />} />
                            <Route path='categories/update/:id' element={<UpdateCategory />} />
                            <Route path='products' element={<ProductsMain />} />
                            <Route path='product/add' element={<AddProduct />} />
                            <Route path='product/update/:id' element={<UpdateProduct />} />
                            <Route path='users' element={<UsersMain />} />
                            <Route path='orders' element={<OrdersMain/>}/>
                        </Route>
                    </Route>


                    {/*customers */}
                    <Route path='/' element={<CustomerRoute />} >
                        <Route path='product/:id' element={<ProductDetails/>}/>
                        <Route path='cart' element={<Cart/>}/>
                        <Route path='checkout' element={<CheckOut/>}/>
                        <Route path='checkout/payment' element={<PaymentMain/>}/>
                        <Route path='payment/success' element={<PaymentSuccess/>}/>
                        <Route path="userprofile" element={<Profile/>}/>
                    </Route>
                        <Route path='order/:id' element={<OrderDetails/>}/>
                </Route>

                {/* <Route path='/' element={<Second/>}/> */}
            </Routes>
        </BrowserRouter>
    )
}

export default MyRoutes