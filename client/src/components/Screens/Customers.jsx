import React, { useContext, useEffect, useState } from 'react'
import { GlobalContext } from '../../GlobalContext'
import axios from 'axios'
import { toast } from 'react-toastify'

function Customers() {

  const context = useContext(GlobalContext)
  const [token] = context.auth.token

  const [users,setUsers] = useState([])

  const readUsers = async() => {
    const res = await axios.get(`/api/auth/all/users`,{
      headers:{
        Authorization: token
      }
    })
    setUsers(res.data.users)
  }

  useEffect(() => {
    readUsers()
  },[])

  //block user
  const blockUser = async(id,msg)=>{
    if(window.confirm(`Are you sure to ${msg} user?`)){
      let data = msg === "Block" ? false: true;
      await axios.patch(`/api/auth/user/${id}`,{
        isActive: data
      },
        {
        headers :{
          Authorization: token
        }
      }).then(res => {

        toast.success(res.data.msg)
      }).catch(err => toast.error(err.response.data.msg))
      setTimeout(()=> {
        window.location.reload()
      },3000)
    }else{
      return
    }
  }
  //delete user
  const deleteUser = async(id)=>{
    if(window.confirm(`Are you sure to delete this user?`)){
      
      await axios.patch(`/api/auth/user/${id}`,
        {
        headers :{
          Authorization: token
        }
      }).then(res => {

        toast.success(res.data.msg)
      }).catch(err => toast.error(err.response.data.msg))
      setTimeout(()=> {
        window.location.reload()
      },3000)
    }else{
      return
    }
  }
  return (
    <div className="container">
        <div className="row">
        <div className="col-md-12 text-center">
            <h5 className="display-5 text-success">Customer Lists</h5>
        </div>

        </div>

        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-body">
                <table className="table table-bordered table-striped table-hovered">
                  <thead>
                    <tr className='text-center'>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Mobile</th>
                      <th>Role</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      users && users.map((item,index) =>{
                        return (
                          <tr className="text-center" key={index}>
                            <td> {item.name} </td>
                            <td> {item.email} </td>
                            <td> {item.mobile} </td>
                            <td> {item.role} </td>
                            <td> {item.isActive ? <span className='badge bg-success'>Active</span> : <span className='badge bg-danger'>Blocked</span>} </td>
                            <td> 
                              <button onClick={() => blockUser(item._id, item.isActive ? "Block" :"unBlock")} className="btn btn-link">
                                "Block" ? "UnBlock"</button>
                              <button className="btn btn-link">Delete</button> 
                            </td>
                          </tr>
                        )
                      })
                    }
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Customers