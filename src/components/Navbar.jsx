
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { logout } from '../redux/slice/AuthSlice'
export const Navbar = () => {
  const dispatch=useDispatch()
  const  {Logouttoggle}=useSelector((state)=>state?.auth)
  const name = localStorage.getItem("name");
 const items=useSelector((state)=>state.cart.cartItem)
 const handleLogout=()=>{
  dispatch(logout())
  
 }
  
  return (
    <>
    <nav className="navbar navbar-expand-lg " style={{maxWidth:"100%",backgroundColor:"lightgray"}}>
    <Link className="navbar-brand" style={{fontStyle:"italic",fontWeight:"1000",fontSize:"25px"}}>E <i class="fa-sharp fa-solid fa-at"></i> Cart</Link>
   
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
      
        <li className="nav-item active">
          <Link className="nav-link" to="/">Product</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="cartproduct">Cartproduct</Link>
        </li>
        <li className="nav-item">
        <Link className="nav-link" to="student">Student</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="blog">Blog</Link>
      </li>
        {
           Logouttoggle ? <>
          <li className="nav-item active">
          <Link className="nav-link"  >{name}</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to={'/login'} onClick={handleLogout} >Logout</Link>
        </li>
          </> : <>
            <li className="nav-item active">
          <Link className="nav-link" to={'/login'} >Login</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to={'/register'}>Register</Link>
        </li>
          </>  
            
          
          
        }
       
        <li className="nav-item">
        <span className="nav-link"><i class="fas fa-shopping-cart"></i> {items?.length}</span>
      </li>
      
    </ul>
  
    </div>
  </nav>
  
    </>
  )
}
