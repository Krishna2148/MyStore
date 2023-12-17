import React, { useState } from 'react'
import { prices } from './Prices'
const PriceRadio = ({handlePrice}) => {
    let [price,setPrice]=useState([])
    const handleChange =e=>{
        let selected = e.target.value
        let searchprice = prices.find(item=>item.id==selected)
        let value = searchprice.value
        setPrice(value)
        // console.log(value)
        handlePrice(value,'price')
    }
    return (
        <>
            <h1 className="text-2xl font-bold underline px-4">Prices</h1>
            {
                prices.map(price => {
                    return <div key={price.id} className="px-4 pt-1">
                        <input type="radio" id={price.id} value={price.id} name='price' onChange={handleChange}/>
                        <label htmlFor={price.id} className='ml-2 tet-xl cursor-pointer'>{price.title}</label>
                    </div>
                })
            }
        </>
    )
}

export default PriceRadio