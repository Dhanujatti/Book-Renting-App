import React, { useContext } from 'react'
import { BrowserRouter, Route,NavLink, Routes} from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import { GlobalContext } from './GlobalContext'

import Menu from './components/Util/Menu'
import Home from './components/Default/Home'
import Contact from './components/Default/Contact'
import Login from './components/Auth/login'
import Register from './components/Auth/Register'
import UserDashboard from './components/User/UserDashboard'
import AdminDashboard from './components/Admin/AdminDashboard'
import Pnf from './components/Util/Pnf'
import ProtectedRoute from './AuthGuard/ProtectedRoute'
import Header from './components/Util/Header'
import Footer from './components/Util/Footer'
import Books from './components/Screens/Books'
import Category from './components/Screens/Category'
import Rent from './components/Screens/Rent'
import Customers from './components/Screens/Customers'
import AddBook from './components/Screens/Book/AddBook'
import BookDetails from './components/Screens/Book/BookDetails'
import UpdateBook from './components/Screens/Book/UpdateBook'
import UpdateCategory from './components/Screens/category/UpdateCategory'
import AddCategory from './components/Screens/category/AddCategory'
import NewRent from './components/Screens/rent/newRent'
import UpdateRent from './components/Screens/rent/UpdateRent'
import RentDetails from './components/Screens/rent/RentDetails'

function App(){
  const context = useContext(GlobalContext)
  const [isLogged] = context.auth.isLogged
  const [isUser] = context.auth.isUser
  const [isAdmin] = context.auth.isAdmin

  return(
    <BrowserRouter>
    <Header/>
      <Menu/>
      <ToastContainer position={'top-center'} autoClose={4000}/>

      <Routes>
        <Route path={`/`} element={<Home/>}/>
        <Route path={`/contact`} element={<Contact/>}/>
        <Route path={`/login`} element={<Login/>}/>
        <Route path={`/register`} element={<Register/>}/>
       {
          isLogged && isUser ?(
            <Route element={<ProtectedRoute/>}>
                 <Route path={`/user/dashboard`} element={<UserDashboard/>}/>
            </Route>

          ): null
       }
       {
          isLogged && isAdmin ?(
            <Route element={<ProtectedRoute/>}>
                <Route path={`/admin/dashboard`} element={<AdminDashboard/>}/>  
                <Route path={`/admin/books/list`} element={<Books/>}/>
                <Route path={`/admin/book/add`} element={<AddBook/>}/>
                <Route path={`/admin/book/details/:id`} element={<BookDetails/>}/>
                <Route path={`/admin/book/edit/:id`} element={<UpdateBook/>}/>
                <Route path={`/admin/category/list`} element={<Category/>}/>
                <Route path={`/admin/category/add`} element={<AddCategory/>}/>
                <Route path={`/admin/category/edit/:id`} element={<UpdateCategory/>}/>
                <Route path={`/admin/rented/list`} element={<Rent/>}/>
                <Route path={`/admin/rented/new`} element={<NewRent/>}/>
                <Route path={`/admin/rented/edit/:id`} element={<UpdateRent/>}/>
                <Route path={`/admin/rented/details/:id`} element={<RentDetails/>}/>
                <Route path={`/admin/customer/list`} element={<Customers/>}/>
            </Route>

          ): null
       }
        <Route path={`/*`} element={<Pnf/>}/>
      </Routes>
      <Footer/>
    </BrowserRouter>
  )
}

export default App