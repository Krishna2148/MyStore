import React from 'react'
import { API } from '../config'
import { Link } from 'react-router-dom'

const Product_Card = ({product}) => {
  return (
    <>
    <div className="card w-3/4 md:w-full mx-auto ">
                <img src={`${API}/${product.image}`} alt="" />
                <h1>{product.title}</h1>
                <h1>{product.price}</h1>
                <Link to={`/product/${product._id}`}>Add To Cart</Link>
            </div>
    </>
  )
}

export default Product_Card