import axios from 'axios'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { GlobalContext } from '../../../GlobalContext'

function UpdateCategory() {
    const [category, setCategory] = useState({
        title:"",
        desc:""
    })
    const context = useContext(GlobalContext)
    const [token] = context.auth.token

    const params = useParams()

    const initData = useCallback(() => {
        const readSingle = async () =>{
            const res = await axios.get(`/api/category/single/${params.id}`,{
                headers: {
                    Authorization: token
                }
            })
            setCategory(res.data.category)
        }
        readSingle()
    },[])

    useEffect(() => {
        initData()
    },[])

    const navigate = useNavigate()

    const readValue = (e) => {
        const { name, value} = e.target
        setCategory({...category, [name] : value})
    }

    const submitHandler = async (e) => {
        e.preventDefault()
        try {
            await axios.patch(`/api/category/update/${params.id}`,category,{
                headers:{
                    Authorization: token
                }
            }).then(res => {
                toast.success(res.data.msg)
                navigate(`/admin/category/list`)
            }).catch(err => toast.error(err.response.data.msg))
        } catch (err) {
            toast.error(err.msg)
        }
    }
  return (
    <div className="container">
        <div className="row">
            <div className="col-md-12 text-center">
                <h3 className="display-3 text-success">Update Category</h3>
            </div>
        </div>
        <div className="row">
            <div className="col-md-6 offset-md-3">
                <div className="card">
                    <div className="card-body">
                        <form autoComplete='off' onSubmit={submitHandler}>
                            <div className="form-group mt-2">
                                <label htmlFor="title">Title</label>
                                <input type="text" name="title" value={category.title} onChange={readValue} id="title" className='form-control' />
                            </div>
                            <div className="form-group mt-2">
                                <label htmlFor="desc">Description</label>
                                <textarea name="desc" id="desc" cols="30" rows="5" value={category.desc} onChange={readValue} className='form-control' required></textarea> 
                            </div>
                            <div className="form-control mt-2">
                                <input type="submit" value="Update Category" className='btn btn-outline-success' />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default UpdateCategory