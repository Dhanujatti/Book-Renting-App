import React,{useCallback, useContext,useState} from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { GlobalContext } from '../../GlobalContext'

function UserDashboard() {
  const context = useContext(GlobalContext)
  const [token] = context.auth.token
    const [ rent, setRent] = useState([])

    const readRent = useCallback(() => {
      const
    })
  </context>
  return (
    <div>UserDashboard</div>
  )
}

export default UserDashboard