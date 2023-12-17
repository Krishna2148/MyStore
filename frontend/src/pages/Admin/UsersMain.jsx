import React, { useEffect, useState } from 'react'
import { getUserslist, updateRole } from '../../api/userApi'

const UsersMain = () => {
    let [users, setUsers] = useState([])
    let [success,setSuccess] = useState(false)

    useEffect(() => {
        getUserslist()
            .then(data => {
                if (data.error) {
                    console.log(data.error)
                }
                else {
                    setUsers(data)
                }
            })
    }, [success])

    const handleRole = (id,role)=>e=>{
        setSuccess(false)
        updateRole(id,role)
        .then(data => {
            if(data.error) {
                console.log(data.error)
            }
            else{
                setSuccess(true)
            }
        })
    }
    return (

        <div className='p-5 text-center text-3xl'>
<table className='text-xl m-auto'>
    <thead>
        <tr>
            <td>S.No</td>
            <td>User Name</td>
            <td>Email</td>
            <td>Role</td>
            <td>Action</td>
        </tr>
    </thead>
    <tbody>
        {
            users.length>0 &&
            users.map((user,i)=>{
                return <tr key={i}>
                    <td>{i+1}</td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td>
                        {
                            user.role === 'admin'? 
                            <button className='bg-red-500 px-3 py-1' onClick={handleRole(user._id,"customer")}>Remove Admin</button>
                            :
                            <button className='bg-green-500 px-3 py-1' onClick={handleRole("admin")}>Make Admin</button>
                        }
                    </td>
                </tr>
            })
        }
    </tbody>
</table>
        </div>

    )
}

export default UsersMain