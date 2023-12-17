import React, { useEffect, useState } from 'react'
import { getAllproducts } from '../../../api/productapi'
import { Link } from 'react-router-dom'
import { API } from '../../../config'

const ProductsMain = () => {
let [products,setProducts] = useState()
useEffect(()=>{
    getAllproducts()
    .then(data=>{
        if(data.error){
            console.log(data.error)
        }
        else{
            setProducts(data)
        }
    })
},[]) 


  return (
    <>
     <div className="p-5 w-full">
        <div className='flext justify-between'>
          <h1 className='text-3xl font-bold text-blue-700'>Products</h1>
          <Link to={'/admin/product/add'} className='add button rounded-lg'>Add New Product</Link>
        </div>

        <table className='w-full'>
          <thead>
            <tr>
              <th>S.No</th>
             <th>Product</th>
             <th>Title</th>
             <th>Unit Price</th>
             <th>Count In Stock</th>
             <th>Category</th>
             <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
            products?.map((product,i) =>{
                return <tr key={i}>
                    <td>{i+1}</td>
                    <td>
                        <img src={`${API}/${product.image}`} alt={product.title} className="w-50 h-50" />
                    </td>
                    <td>{product.title}</td>
                    <td>Rs.{product.price}</td>
                    <td>{product.count_in_stock}</td>
                    <td>{product.category?.category_name}</td>
                    <td>
                    <Link to={`/admin/product/update/${product._id}`} className='update button rounded-l-lg'>Update</Link>
                    <button className='delete-button rounded-l-lg'>Remove</button>
                  </td>
                </tr>
            })
            }
          </tbody>
        </table>

      </div>
    </>
  )
}

export default ProductsMain