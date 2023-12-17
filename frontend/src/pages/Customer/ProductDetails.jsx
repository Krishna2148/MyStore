import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getProduct, getRelatedProducts } from '../../api/productapi'
import { API } from '../../config'
import Product_Card from '../../components/Product_Card'
import { useDispatch } from 'react-redux'
import { addToCart } from '../../reducers/cartAction'

const ProductDetails = () => {
    const { id } = useParams()
    let [product, setProduct] = useState({})
    let [relatedProducts, setRelatedProduct] = useState([])

    const dispatch = useDispatch()

    useEffect(() => {
        getProduct(id)
            .then(data => {
                if (data.error) {
                    console.log(data.error)
                }
                else {
                    setProduct(data)
                }
            })
        getRelatedProducts(id)
            .then(data => {
                if (data.error) {
                    console.log(data.error)
                }
                else {
                    setRelatedProduct(data)
                }
            })
    }, [id])
    const handleAddToCart = e => {
        dispatch(addToCart(id, 1))
    }

    return (
        <>
            <div className="p-10 m:grid md:grid-cols-2">
                <div className='p-10'>
                    <img src={`${API}/${product.image}`} alt="" className='w-full p' />
                </div>
                <div className='p-10'>
                    <h1>{product.title}</h1>
                    <h1>Price:Rs.{product.price}</h1>
                    <h2>Category:{product.category?.category_name}</h2>
                    <p>Description:{product.description}</p>
                    <h2>Count In Stock:{product.count_in_stock}</h2>
                    <h2>Rating:{product.rating}/5</h2>
                    <button onClick={handleAddToCart} className="btn btn-primary m-2 button ">Add To Cart</button>
                </div>
            </div>
            <h1 className='text-2xl font-bold underline px-10'>Related Products</h1>
            <div className="col-span-9 bg-slate-60 p-5 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {
                    relatedProducts.slice(0, 4).map(product => {
                        return <Product_Card product={product} key={product._id} />
                    })
                }

            </div>

        </>
    )
}

export default ProductDetails