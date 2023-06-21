import React, { useContext, useEffect, useState } from 'react'
import { GlobalContext } from '../../GlobalContext'
import axios from 'axios'
import { NavLink } from 'react-router-dom'
import { toast } from 'react-toastify'

function Rent() {
  const context = useContext(GlobalContext)
  const [token] =context.auth.token

    const [rent, setRent] = useState([])

    const readRentlist = async () => {
       const res = await axios.get(`/api/rent/all`,{
        headers: {
          Authorization: token
        }
       })
       setRent(res.data.rents)
    }

    useEffect(() =>{
      readRentlist()
    },[])

    //delete a rent
    const deleteHandler = async(id,bookId) => {
      if(window.confirm(`Are you sure to delete a rent?`)){
        const res = await axios.delete(`/api/rent/delete/${id}/book/${bookId}`,{
          headers: {
            Authorization: token
          }
        })
        toast.success(res.data.msg)
        window.location.reload()
      }else{
        toast.warning(`delete terminated`)
      }
    }
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-12 text-center">
            <h5 className="display-5 text-success">Rented Lists</h5>
        </div>

      </div>

    <div className="row">
      <div className="col-md-12">
        <table className="table table-bordered table-striped table-hovered">
          <thead >
           <tr>
            <th colSpan={8}>
              <NavLink to={`/admin/rented/new`} className="btn btn-success float-end">Add New</NavLink>
            </th>
           </tr>
            <tr className='text-center'>
              <th>Book title</th>
              <th>Book image</th>
              <th>User Name</th>
              <th>Amount</th>
              <th>Rented Date</th>
              <th>Return Date</th>
              <th>Payment Status</th>
              <th>Actions</th>
            </tr>

          </thead>
          <tbody>
            {
              rent && rent.map((item,index) => {
                const {_id,bookId, userId,user,book,amount,rentDate,returnDate,paymentStatus} = item

                return (
                  <tr className="text-center" key={index}>
                      <td>{book.title}</td>
                      <td>
                        <img src={book.image ? book.image.url : "#"} alt="no book found" className='img-fluid' width={50} height={50}/>
                      </td>
                      <td>
                        { user.name}
                      </td>
                      <td>&#8377; {amount}</td>
                      <td>{ rentDate }</td>
                      <td>{ new Date(returnDate).toLocaleString() }</td>
                      <td>{paymentStatus}</td>
                      <td>
                        <NavLink to={`/admin/rented/details/${_id}`} className='btn btn-link'>Details</NavLink>
                        <NavLink to={`/admin/rented/edit/${_id}`} className='btn btn-link'>Return</NavLink>
                        <button onClick={() => deleteHandler(_id,bookId)} className='btn btn-link'>Delete</button>
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
  )
}

export default Rent