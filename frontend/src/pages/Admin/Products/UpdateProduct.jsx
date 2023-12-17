import React, { useEffect, useRef, useState } from 'react'
import { getAllCategories } from '../../../api/categoryapi'
import { isAuthenticated } from '../../../api/userApi'
import { getProduct, updateProduct } from '../../../api/productapi'
import { useNavigate, useParams } from 'react-router-dom'
import { API } from '../../../config'

const UpdateProduct = () => {
    const { token } = isAuthenticated
    const { id } = useParams()
    let [product, setProduct] = useState({
        title: '',
        price: '',
        description: '',
        count_in_stock: '',
        image: '',
        category: '',
        formdata: new FormData
    })
    let [categories, setCategories] = useState([])
    let [error, setError] = useState('')
    let [success, setSuccess] = useState(false)

    const navigate = useNavigate()
    let category_ref = useRef()


    useEffect(() => {
        getAllCategories()
            .then(data => {
                if (data.error) {
                    console.log(data.error)
                }
                else {
                    setCategories(data)
                }
            })
        getProduct(id)
            .then(data => {
                if (data.error) {
                    console.log(data.error)
                }
                else {
                    setProduct({...product,...data})
                    category_ref.current.value=data.category?._id
                }
            })
    }, [])

    const { formdata, title,price, description,count_in_stock,image,category} = product
    const handleChange = e => {
        if (e.target.name === "product_image") {
            formdata.set(e.target.name, e.target.files[0])
        }
        else {
            setProduct({ ...product, [e.target.name]: e.target.value })
            formdata.set(e.target.name, e.target.value)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        updateProduct(token,id,formdata)
            // addProduct(token,formdata)
            .then(data => {
                if (data.error) {
                    setError(data.error)
                }
                else {
                    setSuccess(true)
                }
            })
    }

    const showError = () => {
        if (error) {
            return <div className="bg-red-300 p-5 text-center text-2xl">{error}</div>
        }
    }

    const redirect = () => {
        if (success) {
            navigate('/admin/products')
        }
    }
    return (
        <>
            <div className="p-5">
                <h1 className="text-3xl font-bold underline">Update Product</h1>

                <form className="w-3/4 p-5 bg-slate-300 rounded mt-2">
                    {showError()}
                    {redirect()}
                    <label htmlFor="title" className='text-xl '>Product Name</label>
                    <input type="text" id="title" className='w-full my-2 px-3 py-2 outline-none rounded-md'
                        onChange={handleChange} name="title"  value={title}/>

                    <label htmlFor="price" className='text-xl '>Product Price</label>
                    <input type="number" id="price" className='w-full my-2 px-3 py-2 outline-none rounded-md'
                        onChange={handleChange} name="price" value={price}/> 

                    <label htmlFor="desc" className='text-xl '>Product Description</label>
                    <textarea id="desc" className='w-full my-2 px-3 py-2 outline-none rounded-md textarea'
                        onChange={handleChange} name="description" value={description}/>

                    <label htmlFor="count_in_stock" className='text-xl '>Count In Stock</label>
                    <input type="number" id="count_in_stock" className='w-full my-2 px-3 py-2 outline-none rounded-md'
                        onChange={handleChange} name='count_in_stock' value={count_in_stock} />

                    <label htmlFor="image" className='text-xl '>Product Image</label>
                    <img src={`${API}/${image}`} className='w-50 h-50' alt="{`${image}}" />
                    <input type="file" id="image" className='w-full my-2 px-3 py-2 outline-none rounded-md'
                        onChange={handleChange} name='product_image' />

                    <label htmlFor="category" className='text-xl '>Category</label>
                    <select id='category' className='w-full my-2 px-3 py-2 outline-none rounded-md' name='category' onChange={handleChange} ref={category_ref}>
                        <option selected disabled>
                            Choose Category
                        </option>
                        {
                            categories.map(category => {
                                return <option key={category._id} value={category._id}>{category.category_name}</option>
                            })
                        }
                    </select>
                    <button className='add button w-full rounded-md'
                        onClick={handleSubmit}>Update Product</button>

                </form>
            </div>
        </>
    )
}

export default UpdateProduct