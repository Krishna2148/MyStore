import React, { useEffect, useState } from 'react'
import { deleteCategory, getAllCategories } from '../../api/categoryapi'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import { isAuthenticated } from '../../api/userApi'

const AdminCategories = () => {
  let [categories, setCategories] = useState([])
  const {token} = isAuthenticated()
  let [categoryupdated, setCategoryUpdate]= useState(false)
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
  }, [categoryupdated])

  const handleDelete =  id=> {
    setCategoryUpdate(false)
    Swal.fire({
      title: 'Delete Categoty?',
      text: 'Are you sure you want to delete this category?',
      icon: 'question',
      showCancleButton: 'true',
      confirmButtonText: 'YES',
      canclebuttonColor: '#dd0000' 
    })
      .then(result => {
        if (result.isConfirmed) {
          deleteCategory(id,token)
          .then(data=>{
            if(data.error){
              Swal.fire({
                title: data.error,
                icon: 'error',
                timer: 2000,
                showConfirmButton: false,
                position: "top-right"
              })
            }
            else{
              setCategoryUpdate(true)
              Swal.fire({
                title: "Category deleted successfully",
                icon: 'success',
                timer: 2000,
                showConfirmButton: false,
                position: "top-right"
              })
            }
          })
         
        }
      })
  }

  return (
    <>
      <div className="p-5 w-3/4">
        <div className='flext justify-between'>
          <h1 className='text-3xl font-bold text-blue-700'>Categories</h1>
          <Link to={'/admin/categories/add'} className='add button rounded-lg'>Add New Category</Link>
        </div>

        <table className='w-full'>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Category</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              categories.map((category, i) => {
                return <tr key={category._id}>
                  <td>{i + 1}</td>
                  <td>{category.category_name}</td>
                  <td>
                    <Link to={`/admin/categories/update/${category._id}`} className='update button rounded-l-lg'>Update</Link>
                    <button className='delete-button rounded-l-lg' onClick={()=>handleDelete(category._id)}>Remove</button>
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

export default AdminCategories