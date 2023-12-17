import React, { useEffect, useState } from 'react'
import { getAllCategories } from '../api/categoryapi'

const CategoryCheckBox = ({handleCategory}) => {
    let [categories,setCategories]=useState([])
    let [checked,setChecked]=useState([])
    useEffect(()=>{
        getAllCategories()
        .then(data =>{
            if(data.error){
                console.log(data.error)
            }
            else{
                setCategories(data)
            }
        })
    },[])

const handleChange = (e)=>{
    let newChecked=[...checked]
    let selected = e.target.value
    let exists = newChecked.findIndex(item=>item===selected)
    if(exists!=-1){
        newChecked.splice(exists,1)
    }
    else{
        newChecked.push(selected)
    }
    setChecked(newChecked)
    handleCategory(newChecked,'category')
    // console.log(newChecked)
}

  return (
    <>
    <h1 className='text-2xl font-bold underline px-4 pt-4'>Categories</h1>
    {
        categories.map(category =>{
            return <div key={category._id} className='px-4 pt-1'>
                <input type="checkbox" id={category._id}  value={category._id} className="mr-2" onChange={handleChange}/>
                <label htmlFor={category._id} className="text-xl">{category.category_name}</label>
            </div>
        })
    }
    </>
  )
}

export default CategoryCheckBox