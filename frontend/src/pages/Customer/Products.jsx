import React, { useEffect, useState } from 'react'
import { API } from '../../config'
import CategoryCheckBox from '../../components/CategoryCheckBox'
import PriceRadio from '../../components/PriceRadio'
import { Link } from 'react-router-dom'
import Product_Card from '../../components/Product_Card'
import { getfilteredproducts } from '../../api/productapi'

const Products = () => {
    let [sortBy, setSortBy] = useState('')
    let [orderBy, setOrderBy] = useState(1)
    let [limit, setLimit] = useState(8)

    let [products, setProducts] = useState([])
    let [filter, setFilter] = useState({
        filters: { category: [], price: [] }
    })
    useEffect(() => {
        getfilteredproducts(filter,sortBy,limit)
            .then(data => {
                if (data.error) {
                    console.log(data.error)
                }
                else {
                    setProducts(data)
                }
            })
    }, [filter,sortBy,limit])

    const handleFilter = (filters, filterBy) => {
        let newFilter = { ...filter }
        newFilter.filters[filterBy] = filters
        setFilter(newFilter)

    }

    const handleSortBy =e=>{
        setSortBy(e.target.value)
    }

    return (
        <>
            <div className="grid sm:grid-cols-12">
                <div className="col-span-3 bg-slate-100">
                    <CategoryCheckBox handleCategory={handleFilter} />
                    <PriceRadio handlePrice={handleFilter} />
                </div>
                <div className="col-span-9 bg-slate-60 p-5 grid  md:grid-cols-2 lg:grid-cols-3 gap-5">
                    <div>
                        <div className="">
                            <input id='createdAt' type="radio" value={'createdAt'} name='sortBy' onChange={handleSortBy} />
                            <label htmlFor="createdAt">Date Added</label>
                        </div>
                        <div>
                            <input id='title' type="radio" value={'title'} name='sortBy' onChange={handleSortBy} />
                            <label htmlFor="title">Product Name</label>
                        </div>
                        <div>
                            <input id='price' type="radio" value={'price'} name='sortBy' onChange={handleSortBy} />
                            <label htmlFor="price">Product Price</label>
                        </div>
                    </div>
                    {
                        products.map(product => {
                            return <Product_Card product={product} key={product._id} />
                        })
                    }

                </div>
            </div>
        </>
    )
}

export default Products