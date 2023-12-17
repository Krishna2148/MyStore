import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import { isAuthenticated } from '../../api/userApi';
import { editCategory, getCategoryDetails } from '../../api/categoryapi';
import { useParams } from 'react-router-dom';
  

const UpdateCategory = () => {
    let [category,setCategory]=useState('')
    let [error,setError]=useState('')
    let [success,setSuccess]=useState(false)
    const {token} = isAuthenticated()
    const {id}= useParams()
useEffect(()=>{
    getCategoryDetails(id)
    .then(data=>{
        if(data.error){
            console.log(data.error)
        }
        else{
            setCategory(data.category_name)
        }
    })
},[])

    const handleSubmit = (e)=>{
        e.preventDefault();
        editCategory(id,category,token)
        .then(data=>{
            if(data.error){
                setError(data.error)
                setSuccess(false)
            }
            else{
                setSuccess(true)
                setError('')
            }
        })
    }
const showSuccess = ()=>{
    if(success){
        toast.success('Category updated successfully')
    }
}
const showError = ()=>{
    if(error){
        toast.error(error)
        return <div className="bg-red-200 text-red-700 pl-4 mt-2 py-2">{error}</div>
    }
}

  return (
    <>
    <ToastContainer position ='top-right' theme ='colored'/>
    {showSuccess()}
   
    <div className="p-5">
        <h1 className="text-3xl font-bold underline">Update Category</h1>

        <form className="w-1/2 p-5 bg-slate-300 rounded mt-2">
            <label htmlFor="category_name" className='text-xl '>Category Name</label>
            <input type="text" id="category_name" className='w-full my-2 px-3 py-2 outline-none rounded-md'
            onChange={e=>setCategory(e.target.value)} value={category}/>
            <button className='add button w-full rounded-md'
            onClick={handleSubmit}>Update Category</button>
             {showError()}
        </form>
    </div>
    </>
  )
}

export default UpdateCategory